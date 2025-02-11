@echo off


REM Ejecuta el comando en PowerShell en segundo plano con la ventana minimizada
echo Iniciando la aplicación de Next.js...
start powershell -WindowStyle Minimized -NoExit -Command "npm run start"

REM Espera unos segundos para asegurarse de que el servidor inicie
timeout /t 5 > nul

REM Abre el navegador en el puerto especificado
start  http://172.21.64.1:3000

REM Mensaje para indicar que todo está funcionando
echo La aplicación se está ejecutando en  http://172.21.64.1:3000
pause
