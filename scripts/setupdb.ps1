# Variables de configuración
$postgresUser = "postgres"
$postgresPassword = "admin1234" # Cambia esto a tu contraseña real de postgres
$dbUser = "admin"
$dbPassword = "prados2025"
$dbName = "prados_db"

# Ruta al archivo pg_hba.conf
$pgHbaConfPath = "C:\Program Files\PostgreSQL\17\data\pg_hba.conf" # Cambia la versión si es necesario

# Crear el usuario y la base de datos
Write-Host "Configurando PostgreSQL..."
try {
    $env:PGPASSWORD = $postgresPassword
    psql -U $postgresUser -c "CREATE USER $dbUser WITH PASSWORD '$dbPassword';"
    psql -U $postgresUser -c "CREATE DATABASE $dbName OWNER $dbUser;"
    psql -U $postgresUser -c "GRANT ALL PRIVILEGES ON DATABASE $dbName TO $dbUser;"
    psql -U $postgresUser -c "ALTER USER $dbUser CREATEDB;"
    Write-Host "Usuario y base de datos configurados correctamente."
}
catch {
    Write-Error "Error al crear el usuario o la base de datos: $_"
}

# Configurar pg_hba.conf para permitir conexiones locales con md5
Write-Host "Configurando pg_hba.conf..."
try {
    if (Test-Path $pgHbaConfPath) {
        $pgHbaContent = Get-Content $pgHbaConfPath
        $pgHbaContent += "host    all             all             127.0.0.1/32            md5"
        Set-Content -Path $pgHbaConfPath -Value $pgHbaContent
        Write-Host "pg_hba.conf configurado correctamente."
    }
    else {
        Write-Error "No se encontró el archivo pg_hba.conf en $pgHbaConfPath"
    }
}
catch {
    Write-Error "Error al configurar pg_hba.conf: $_"
}

# Reiniciar el servicio de PostgreSQL
Write-Host "Reiniciando servicio de PostgreSQL..."
try {
    Start-Process powershell -Verb RunAs -ArgumentList "Restart-Service -Name 'postgresql-x64-15'; exit"
    Write-Host "Servicio de PostgreSQL reiniciado correctamente."
}
catch {
    Write-Error "Error al reiniciar el servicio: $_"
}

# Probar conexión con Prisma
Write-Host "Probando conexión con Prisma..."
try {
    npx prisma migrate deploy --schema ../prisma/schema.prisma
    Write-Host "Migración realizada correctamente."
}
catch {
    Write-Error "Error al ejecutar las migraciones: $_"
}

Write-Host "Proceso completado."
