import WrapperComponent from "@/Components/Common/WrapperComponent";

const PrivacyPage = () => {
  return (
    <WrapperComponent
      classes={{ sectionClass: "search-section", col: "mx-auto" }}
      colProps={{ xxl: 6, xl: 8 }}
    >
      <div style={{ paddingBottom: 40 }}>
        <h1>Política de Privacidad de SupleMK</h1>
        <p>Última actualización: 2024-03-06</p>
        <p>
          En SupleMK, nos comprometemos a proteger la privacidad y
          seguridad de nuestros clientes y visitantes. Esta Política de
          Privacidad describe cómo recopilamos, utilizamos, protegemos y, en
          ciertos casos, divulgamos su información personal. Al utilizar nuestro
          sitio web https://suplemk.com, usted acepta la recopilación y uso de
          información de acuerdo con esta política.
        </p>

        <h2>Información que recopilamos</h2>
        <p>
          Recopilamos información que nos ayuda a brindarle nuestros servicios y
          a mejorar su experiencia de compra. Esto incluye:
        </p>
        <ul>
          <li>
            <strong>Datos de contacto</strong>: Su nombre, dirección de correo
            electrónico y número de teléfono.
          </li>
          <li>
            <strong>Información de la cuenta</strong>: Datos necesarios para
            crear y administrar su cuenta en nuestro sitio web, incluyendo su
            nombre, dirección de correo electrónico y contraseña.
          </li>
          <li>
            <strong>Datos de transacciones</strong>: Información sobre las
            compras y transacciones que realiza en nuestro sitio web.
          </li>
        </ul>

        <h2>Cómo utilizamos su información</h2>
        <p>Utilizamos la información recopilada para:</p>
        <ul>
          <li>Procesar sus pedidos y gestionar su cuenta.</li>
          <li>
            Comunicarnos con usted, incluyendo enviarle información sobre
            productos y servicios, ofertas y promociones.
          </li>
          <li>Mejorar y personalizar su experiencia en nuestro sitio web.</li>
          <li>Cumplir con obligaciones legales y resolver disputas.</li>
        </ul>

        <h2>Compartir su información</h2>
        <p>
          No vendemos, alquilamos ni compartimos su información personal con
          terceros, excepto en las siguientes circunstancias:
        </p>
        <ul>
          <li>
            Proveedores de servicios: Podemos compartir su información con
            empresas que nos ayudan a operar nuestro negocio, como procesamiento
            de pagos y entrega.
          </li>
          <li>
            Requerimientos legales: Podemos divulgar su información si es
            requerido por la ley o si creemos de buena fe que tal acción es
            necesaria para cumplir con procesos legales, responder a reclamos o
            proteger los derechos, propiedad o seguridad de nuestra empresa,
            clientes o el público.
          </li>
        </ul>

        <h2>Seguridad de su información</h2>
        <p>
          Tomamos medidas razonables para proteger la información que
          recopilamos de accesos no autorizados, alteración, divulgación o
          destrucción. Sin embargo, ningún método de transmisión por Internet o
          de almacenamiento electrónico es 100% seguro. Por lo tanto, aunque nos
          esforzamos por proteger su información personal, no podemos garantizar
          su seguridad absoluta.
        </p>

        <h2>Sus derechos</h2>
        <p>
          Usted tiene derecho a acceder, corregir, eliminar o limitar el uso de
          su información personal. Si desea ejercer estos derechos, póngase en
          contacto con nosotros en hello@suplemk.com.
        </p>

        <h2>Cambios en la Política de Privacidad</h2>
        <p>
          Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le
          notificaremos de cualquier cambio publicando la nueva Política de
          Privacidad en esta página. Se le aconseja revisar esta Política de
          Privacidad periódicamente para cualquier cambio.
        </p>

        <h2>Contacto</h2>
        <p>
          Si tiene alguna pregunta sobre esta Política de Privacidad, por favor
          contáctenos en:
        </p>
        <ul>
          <li>Correo electrónico: hello@suplemk.com</li>
          <li>Dirección: Mazatlán, Sinaloa, MX</li>
        </ul>
      </div>
    </WrapperComponent>
  );
};

export default PrivacyPage;
