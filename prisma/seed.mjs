import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Verificar y crear roles si no existen
  const [adminRole, userRole] = await Promise.all([
    prisma.role.upsert({
      where: { name: "ADMIN" },
      update: {},
      create: {
        name: "ADMIN",
        display_name: "Administrador",
      },
    }),
    prisma.role.upsert({
      where: { name: "USER" },
      update: {},
      create: {
        name: "USER",
        display_name: "Usuario General",
      },
    }),
  ]);

  console.log("Roles seeded:", { adminRole, userRole });

  // Verificar si ya existe el usuario administrador
  const adminExists = await prisma.user.findUnique({
    where: { email: "admin@example.com" },
  });

  if (!adminExists) {
    // Crear contraseña encriptada
    const passwordHash = await bcrypt.hash("default_password", 10);

    // Crear cuenta de administrador
    const adminUser = await prisma.user.create({
      data: {
        name: "Admin",
        cedula: 12345678,
        email: "admin@example.com",
        password: passwordHash,
        role: {
          connect: { id: adminRole.id },
        },
      },
    });

    console.log("Admin user created:", adminUser);
  } else {
    console.log("Admin user already exists. Skipping creation.");
  }
  const filosifiaExist = await prisma.textos.findFirst({
    where: { name: "ORIGINAL_FILOSOFIA" },
  });
  if (!filosifiaExist) {
    await prisma.textos.createMany({
      data: [
        {
          name: "ORIGINAL_FILOSOFIA",
          textHtml: FILOSOFIAHTML,
        },
        {
          name: "FILOSOFIA",
          textHtml: FILOSOFIAHTML,
        },
        {
          name: "ORIGINAL_SOSTENIMIENTO_M",
          textHtml: SOSTENIMIENTO_M,
        },
        {
          name: "SOSTENIMIENTO_M",
          textHtml: SOSTENIMIENTO_M,
        },
        {
          name: "ORIGINAL_SOSTENIMIENTO_F",
          textHtml: SOSTENIMIENTO_F,
        },
        {
          name: "SOSTENIMIENTO_F",
          textHtml: SOSTENIMIENTO_F,
        },
        {
          name: "ORIGINAL_COMPROMISO_F",
          textHtml: COMPROMISO_F,
        },
        {
          name: "COMPROMISO_F",
          textHtml: COMPROMISO_F,
        },
        {
          name: "ORIGINAL_COMPROMISO_M",
          textHtml: COMPROMISO_M,
        },
        {
          name: "COMPROMISO_M",
          textHtml: COMPROMISO_M,
        },
        {
          name: "ORIGINAL_COMPROMISO_INTERNACION_M",
          textHtml: COMPROMISO_INTERNACION_M,
        },
        {
          name: "COMPROMISO_INTERNACION_M",
          textHtml: COMPROMISO_INTERNACION_M,
        },
        {
          name: "ORIGINAL_COMPROMISO_INTERNACION_F",
          textHtml: COMPROMISO_INTERNACION_F,
        },
        {
          name: "COMPROMISO_INTERNACION_F",
          textHtml: COMPROMISO_INTERNACION_F,
        },
      ],
    });
    console.log("Filosofia created.");
  } else {
    console.log("Filosofia already exists. Skipping creation.");
  }

  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export const FILOSOFIAHTML = `<p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'>&nbsp;</p> <h2 style='margin:0cm;text-align:center;font-size:13px;font-family:"Times New Roman",serif;'><em><span style="font-size:15px;"><strong>FILOSOFIA &nbsp;DE&nbsp;</strong></span></em></h2> <h2 style='margin:0cm;text-align:center;font-size:13px;font-family:"Times New Roman",serif;'><em><strong>PROGRAMA DE RESTAURACI&Oacute;N DE ALCOHOLICOS Y DROGADICTOS</strong></em></h2> <h1 style='margin:0cm;text-align:justify;font-size:16px;font-family:"Times New Roman",serif;font-weight:normal;'><strong><span style="font-size:15px;">&nbsp;</span></strong></h1> <h1 style='margin:0cm;text-align:justify;font-size:16px;font-family:"Times New Roman",serif;font-weight:normal;margin-left:36.0pt;'><span style="font-size:15px;">Es un programa &nbsp; dedicado &nbsp;a la restauraci&oacute;n &nbsp;de alcoh&oacute;licos &nbsp;y drogadictos.&nbsp;</span></h1> <ol>     <ul style="list-style-type: circle;">         <ul style="list-style-type: circle;">             <li>                 <h1 style='margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; text-align: left; font-size: 16px; font-family: "Times New Roman", serif; font-weight: normal;'><span style="font-size:15px;">Reconocemos que la adicci&oacute;n es un s&iacute;ntoma de otros problemas.</span></h1>             </li>             <li>                 <h1 style='margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; text-align: left; font-size: 16px; font-family: "Times New Roman", serif; font-weight: normal;'><span style="font-size:15px;">Reconocemos que los &nbsp;problemas &nbsp; incluyen el f&iacute;sico, espiritual, mental, psicol&oacute;gico y social.&nbsp;</span></h1>             </li>             <li>                 <h1 style='margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; text-align: left; font-size: 16px; font-family: "Times New Roman", serif; font-weight: normal;'><span style="font-size:15px;">Reconocemos que la restauraci&oacute;n no solo es cesaci&oacute;n de la adicci&oacute;n, sino el cambio de los &nbsp; &nbsp; pensamientos que llevan a la persona &nbsp;a la adici&oacute;n.</span><span style="font-size:15px;">&nbsp;</span></h1>             </li>         </ul>     </ul> </ol> <h1 style='margin:0cm;text-align:justify;font-size:16px;font-family:"Times New Roman",serif;font-weight:normal;text-indent:36.0pt;'><span style="font-size:15px;">Estamos &nbsp; dedicados a trabajar &nbsp;en todas sus &aacute;reas &nbsp;para efectuar &nbsp;una restauraci&oacute;n verdadera de las adicciones.</span></h1> <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; PRADOS, es una instituci&oacute;n Cristiana &nbsp;por lo tanto nos apoyamos &nbsp;en el poder &nbsp; de Jesucristo, para traer cambios &nbsp; en &nbsp;la &nbsp;vida del individuo. El proceso normalmente dura ocho meses m&iacute;nimo; Por lo tanto la persona que ingresa a PRADOS debe desear un cambio &nbsp;en su vida, y aceptar &nbsp;que por lo menos tiene que permanecer este tiempo. &nbsp;</span></p> <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; PRADOS, &nbsp;no se responsabilizar&aacute; &nbsp;de las pertenencias &nbsp;de &nbsp;la persona que se escap&oacute; o sali&oacute; &nbsp; sin permiso de la Direcci&oacute;n. Se hace notar que en estos casos no se devuelve al interno ning&uacute;n tipo de dinero, ni tampoco sus pertenencias sin autorizaci&oacute;n del garante. Se dar&aacute; &nbsp;un plazo de &nbsp;<strong><em>7 d&iacute;as</em></strong>&nbsp; para &nbsp; recoger dichas pertenencias, no se entregar&aacute; a nadie sin que el garante lo autorice.</span></p> <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><br></p> <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><br></p>`;

export const SOSTENIMIENTO_M = `<p style='margin:0cm;text-align:center;font-size:13px;font-family:"Times New Roman",serif;'><strong><u><span style="font-size:15px;">SOSTENIMIENTO DEL CENTRO</span></u></strong></p>     <p style='margin:0cm;text-align:left;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">&nbsp;</span></p>     <p style='margin:0cm;text-align:left;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">&nbsp;<strong>PRADOS</strong>, es una entidad &nbsp;de servicio, no lucrativo que no cobra por sus servicios. El Centro &nbsp;est&aacute; &nbsp;sostenido &nbsp; por esfuerzos locales, donativos de las familias, amigos, iglesias y esfuerzos de los internados. &nbsp;</span></p>     <p style='margin:0cm;text-align:left;font-size:13px;font-family:"Times New Roman",serif;'>&nbsp;</p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">Yo:</span><span style="font-size:15px;color:black;background:white;">&nbsp;</span><span style="font-size:15px;">%NOMBRE_GARANTE% con CI. %CI_GARANTE%</span></p>     <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Tel&eacute;fono:</span> %TEL_GARANTE% <span style="font-size:15px;">Calle o Av. %DIR_GARANTE% Ciudad: %CIUDAD_GARANTE%</span></p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">&nbsp;</span></p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">Soy responsable por %NOMBRE_INTERNO% con CI. %CI_INTERNO% &nbsp;</span></p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">&nbsp;, que en caso de que quiera salir antes de cumplir el tiempo determinado por la instituci&oacute;n; no se me devolver&aacute; la garant&iacute;a correspondiente a Bs. 250,00 (aunque su estad&iacute;a sea solo por 1 d&iacute;a pierde todo). Como tambi&eacute;n me comprometo a resarcir econ&oacute;micamente cualquier da&ntilde;o que hiciera el Se&ntilde;or<em>&hellip;</em>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;a los bienes inmuebles de la instituci&oacute;n.</span></p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">&nbsp;</span></p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">Sucre, %FECHA%</span></p>     <p style='margin:0cm;text-align:right;font-size:13px;font-family:"Times New Roman",serif;'><br></p>`;

export const SOSTENIMIENTO_F = `<p style='margin:0cm;text-align:center;font-size:13px;font-family:"Times New Roman",serif;'><strong><u><span style="font-size:15px;">SOSTENIMIENTO DEL CENTRO</span></u></strong></p>     <p style='margin:0cm;text-align:left;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">&nbsp;</span></p>     <p style='margin:0cm;text-align:left;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">&nbsp;<strong>PRADOS</strong>, es una entidad &nbsp;de servicio, no lucrativo que no cobra por sus servicios. El Centro &nbsp;est&aacute; &nbsp;sostenido &nbsp; por esfuerzos locales, donativos de las familias, amigos, iglesias y esfuerzos de los internados. &nbsp;</span></p>     <p style='margin:0cm;text-align:left;font-size:13px;font-family:"Times New Roman",serif;'>&nbsp;</p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">Yo:</span><span style="font-size:15px;color:black;background:white;">&nbsp;</span><span style="font-size:15px;">%NOMBRE_GARANTE% con CI. %CI_GARANTE%</span></p>     <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Tel&eacute;fono:</span> %TEL_GARANTE% <span style="font-size:15px;">Calle o Av. %DIR_GARANTE% Ciudad: %CIUDAD_GARANTE%</span></p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">&nbsp;</span></p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">Soy responsable por %NOMBRE_INTERNO% con CI. %CI_INTERNO% &nbsp;</span></p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">&nbsp;, que en caso de que quiera salir antes de cumplir el tiempo determinado por la instituci&oacute;n; no se me devolver&aacute; la garant&iacute;a correspondiente a Bs. 250,00 (aunque su estad&iacute;a sea solo por 1 d&iacute;a pierde todo). Como tambi&eacute;n me comprometo a resarcir econ&oacute;micamente cualquier da&ntilde;o que hiciera el Se&ntilde;or<em>&hellip;</em>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;a los bienes inmuebles de la instituci&oacute;n.</span></p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">&nbsp;</span></p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">Sucre, %FECHA%</span></p>`;

export const COMPROMISO_M = `<p style='margin:0cm;text-align:center;font-size:13px;font-family:"Times New Roman",serif;'><strong>COMPROMISO DEL &nbsp;INTERNO</strong></p>     <p style='margin:0cm;text-align:center;font-size:13px;font-family:"Times New Roman",serif;'>&nbsp;</p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">Yo, %NOMBRE_INTERNO% con CI: %CI_INTERNO%</span></p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">Estoy intern&aacute;ndome voluntariamente; porque deseo ser liberado de mis adiciones. Estoy de acuerdo con la Filosof&iacute;a de PRADOS; estoy de acuerdo con &nbsp;el sistema de sostenimiento del Centro; estoy &nbsp;dispuesto a sujetarme a los reglamentos internos del Centro que incluyen, sujeci&oacute;n al horario de levantarme, acostarme, estudiar, &nbsp;culto, limpieza de la casa , cocina, trabajos y otros. Esto tambi&eacute;n incluye &nbsp; la separaci&oacute;n &nbsp;durante tres meses &nbsp;de mi familia, amigos, y otros; asimismo &nbsp;el no &nbsp;salir a la &nbsp; calle solo o sin permiso de la Direcci&oacute;n. Estoy dispuesto a sujetarme a los reglamentos, requisitos que me exija &nbsp; &nbsp;PRADOS.</span></p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">&nbsp;</span></p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">Sucre, %FECHA%</span></p>`;

export const COMPROMISO_F = `<p style='margin:0cm;text-align:center;font-size:13px;font-family:"Times New Roman",serif;'>&nbsp;</p>     <p style='margin:0cm;text-align:center;font-size:13px;font-family:"Times New Roman",serif;'><strong>COMPROMISO DE LA &nbsp;INTERNA</strong></p>     <p style='margin:0cm;text-align:center;font-size:13px;font-family:"Times New Roman",serif;'>&nbsp;</p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">Yo, %NOMBRE_INTERNO% con CI: %CI_INTERNO%</span></p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">Estoy intern&aacute;ndome voluntariamente; porque deseo ser liberada de mis adiciones. Estoy de acuerdo con la Filosof&iacute;a de PRADOS; estoy de acuerdo con &nbsp;el sistema de sostenimiento del Centro; estoy &nbsp;dispuesta a sujetarme a los reglamentos internos del Centro que incluyen, sujeci&oacute;n al horario de levantarme, acostarme, estudiar, &nbsp;culto, limpieza de la casa , cocina, trabajos y otros. Esto tambi&eacute;n incluye &nbsp;la separaci&oacute;n &nbsp; durante tres meses &nbsp;de mi familia, amigos, y otros; asimismo no salir a la &nbsp; calle sola y sin permiso de la Direcci&oacute;n. &nbsp;Estoy dispuesta a sujetarme a los reglamentos, requisitos que me exija &nbsp; PRADOS.</span></p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">En caso de tener bebe yo soy es la &uacute;nica responsable de cuidarla sin descuidar mis &aacute;reas de trabajo.</span></p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">&nbsp;</span></p>     <p style='margin:0cm;text-align:justify;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">Sucre, %FECHA%</span></p>`;

export const COMPROMISO_INTERNACION_M = `<p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:center;'><strong><u><span style="font-size:15px;">COMPROMISO DE INTERNACION&nbsp;</span></u></strong></p>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:center;'><br></p>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Yo, Mar&iacute;a Nazareth Directora de PRADOS, que por motivos de desorden y rebeld&iacute;a he tomado la decisi&oacute;n de que los transgresores, agresivos, rebeldes que no quieren acatar el reglamento interno de PRADOS, no pueden permanecer en el centro. Por tal motivo, dejo en claro que cada interno siendo sorprendido en acto en una de estas reglas POR PRIMERA VEZ ser&aacute; rapada su cabeza, lavar&aacute; ollas, platos u otros enseres, como tambi&eacute;n cualquier otro tipo de trabajo que se necesite por <strong><em>2 meses</em></strong> (y volver&aacute; a empezar su terapia de <strong><em>cero&nbsp;</em></strong>no importando el tiempo que est&eacute;, esto para los casos de posesi&oacute;n de alcohol o drogas o si escapa del centro) durante este tiempo mientras dure la disciplina no podr&aacute; &nbsp;jugar ajedrez, ludo, k&acute;aqha, ping pong e ingresar gym, tampoco podr&aacute; ir a jugar futbol o b&aacute;squet (esto para los que cumplen tres meses) &nbsp;en el tiempo de juegos deber&aacute; leer y escribir un cap&iacute;tulo de la &nbsp; biblia que el obrero le asigne.&nbsp;</span></p>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">&nbsp;</span></p>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Si es SEGUNDA VEZ sorprendido en una de estas reglas, ser&aacute; expulsado sin derecho de volver al centro. Las reglas son las siguientes:</span></p>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">&nbsp;</span></p>
    <ol style="margin-bottom:0cm;margin-top:0cm;" start="1" type="1">
        <li style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Agresi&oacute;n f&iacute;sica (empujones, lapos, codazos, cocachos, rodillazos, cabezazos, patadas, pu&ntilde;etes, etc.). Se aclara que si hubiera alg&uacute;n tipo de pelea entre internos y hubiera consecuencias, <strong><em>el garante</em></strong> debe<strong><em>&nbsp;pagar toda</em></strong> curaci&oacute;n u operaci&oacute;n de la persona damnificada hasta su total recuperaci&oacute;n y se aumentar&aacute; <strong><em>2 meses</em></strong> m&aacute;s de terapia al tiempo total de permanencia y pagara 200 bs. De Multa.&nbsp;</span></li>
        <li style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Rehusarse a participar de los cultos que son parte de la terapia (orar, cantar, danzar, etc.).</span></li>
        <li style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Si se le encuentra en posesi&oacute;n de drogas, marihuana, cigarrillos, alcohol y otros. Como tambi&eacute;n si hiciera ingresar por las ventanas o por cualquier otro medio dichas sustancias, que incluye el ofrecer estas a otros internos (vuelve a empezar de <strong><em>cero</em></strong> su terapia).</span></li>
        <li style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Saltar el muro o escapar del centro (ser&aacute; responsabilidad entera del interno y <strong><em>no as&iacute;</em></strong> <strong><em>de la Instituci&oacute;n</em></strong>). Adem&aacute;s, si vuelve a ingresar al centro pagar&aacute; la suma de <strong><em>Bs. 100&nbsp;</em></strong>y vuelve a empezar su terapia de <strong><em>cero</em></strong>.</span></li>
        <li style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Negarse a cumplir la lista de trabajos.</span></li>
        <li style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Falta de respeto al obrero f&iacute;sicamente o con palabras.</span></li>
    </ol>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">&nbsp;</span></p>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Yo, %NOMBRE_INTERNO% &nbsp;con &nbsp; CI: %CI_INTERNO%&nbsp;</span></p>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Estoy intern&aacute;ndome voluntariamente, aceptando las cl&aacute;usulas mencionadas y estoy consciente de todos los requisitos que si no cumplo ser&eacute; expulsado del centro, sabiendo &nbsp;que voy a perder el derecho de mi <em>GARANT&Iacute;A</em> como tambi&eacute;n todos los <em>V&Iacute;VERES</em>, &nbsp; <em>PRODUCTOS de LIMPIEZA</em>, sin derecho a volver al centro a internarme: entonces depende de mi voluntad de cambiar; mi inter&eacute;s de permanecer en el Centro.&nbsp;</span></p>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">&nbsp;</span></p>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Sucre, %FECHA%</span></p>`;

export const COMPROMISO_INTERNACION_F = `<p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:center;'><strong><u><span style="font-size:15px;">COMPROMISO DE INTERNACION&nbsp;</span></u></strong></p>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:center;'><br></p>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Yo, Mar&iacute;a Nazareth Directora de PRADOS, que por motivos de desorden y rebeld&iacute;a he tomado la decisi&oacute;n de que los transgresores, agresivos, rebeldes que no quieren acatar el reglamento interno de PRADOS, no pueden permanecer en el centro. Por tal motivo, dejo en claro que cada interno siendo sorprendido en acto en una de estas reglas POR PRIMERA VEZ ser&aacute; rapada su cabeza, lavar&aacute; ollas, platos u otros enseres, como tambi&eacute;n cualquier otro tipo de trabajo que se necesite por <strong><em>2 meses</em></strong> (y volver&aacute; a empezar su terapia de <strong><em>cero&nbsp;</em></strong>no importando el tiempo que est&eacute;, esto para los casos de posesi&oacute;n de alcohol o drogas o si escapa del centro) durante este tiempo mientras dure la disciplina no podr&aacute; &nbsp;jugar ajedrez, ludo, k&acute;aqha, ping pong e ingresar gym, tampoco podr&aacute; ir a jugar futbol o b&aacute;squet (esto para los que cumplen tres meses) &nbsp;en el tiempo de juegos deber&aacute; leer y escribir un cap&iacute;tulo de la &nbsp; biblia que el obrero le asigne.&nbsp;</span></p>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">&nbsp;</span></p>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Si es SEGUNDA VEZ sorprendido en una de estas reglas, ser&aacute; expulsado sin derecho de volver al centro. Las reglas son las siguientes:</span></p>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">&nbsp;</span></p>
    <ol style="margin-bottom:0cm;margin-top:0cm;" start="1" type="1">
        <li style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Agresi&oacute;n f&iacute;sica (empujones, lapos, codazos, cocachos, rodillazos, cabezazos, patadas, pu&ntilde;etes, etc.). Se aclara que si hubiera alg&uacute;n tipo de pelea entre internos y hubiera consecuencias, <strong><em>el garante</em></strong> debe<strong><em>&nbsp;pagar toda</em></strong> curaci&oacute;n u operaci&oacute;n de la persona damnificada hasta su total recuperaci&oacute;n y se aumentar&aacute; <strong><em>2 meses</em></strong> m&aacute;s de terapia al tiempo total de permanencia y pagara 200 bs. De Multa.&nbsp;</span></li>
        <li style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Rehusarse a participar de los cultos que son parte de la terapia (orar, cantar, danzar, etc.).</span></li>
        <li style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Si se le encuentra en posesi&oacute;n de drogas, marihuana, cigarrillos, alcohol y otros. Como tambi&eacute;n si hiciera ingresar por las ventanas o por cualquier otro medio dichas sustancias, que incluye el ofrecer estas a otros internos (vuelve a empezar de <strong><em>cero</em></strong> su terapia).</span></li>
        <li style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Saltar el muro o escapar del centro (ser&aacute; responsabilidad entera del interno y <strong><em>no as&iacute;</em></strong> <strong><em>de la Instituci&oacute;n</em></strong>). Adem&aacute;s, si vuelve a ingresar al centro pagar&aacute; la suma de <strong><em>Bs. 100&nbsp;</em></strong>y vuelve a empezar su terapia de <strong><em>cero</em></strong>.</span></li>
        <li style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Negarse a cumplir la lista de trabajos.</span></li>
        <li style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Falta de respeto al obrero f&iacute;sicamente o con palabras.</span></li>
    </ol>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">&nbsp;</span></p>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Yo, %NOMBRE_INTERNO% &nbsp;con &nbsp; CI: %CI_INTERNO%&nbsp;</span></p>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Estoy intern&aacute;ndome voluntariamente, aceptando las cl&aacute;usulas mencionadas y estoy consciente de todos los requisitos que si no cumplo ser&eacute; expulsado del centro, sabiendo &nbsp;que voy a perder el derecho de mi <em>GARANT&Iacute;A</em> como tambi&eacute;n todos los <em>V&Iacute;VERES</em>, &nbsp; <em>PRODUCTOS de LIMPIEZA</em>, sin derecho a volver al centro a internarme: entonces depende de mi voluntad de cambiar; mi inter&eacute;s de permanecer en el Centro.&nbsp;</span></p>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;'><span style="font-size:15px;">&nbsp;</span></p>
    <p style='margin:0cm;font-size:13px;font-family:"Times New Roman",serif;text-align:justify;'><span style="font-size:15px;">Sucre, %FECHA%</span></p>`;
