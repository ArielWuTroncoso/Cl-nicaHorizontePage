/**
 * Tratamientos que ofrece la clínica (los siete del afiche de Horizonte).
 *
 * Los textos son informativos y generales: no prometen resultados, plazos ni precios.
 * La indicación de cada tratamiento la define el odontólogo tras evaluar al paciente.
 */

export const AREAS = [
  {
    id: 'estetica',
    nombre: 'Estética dental',
    descripcion: 'Para cambiar el color, la forma o la armonía de tu sonrisa.',
  },
  {
    id: 'cuidado',
    nombre: 'Cuidado y reparación',
    descripcion: 'Para prevenir problemas, tratarlos a tiempo y conservar tus dientes.',
  },
  {
    id: 'reponer',
    nombre: 'Reponer y reconstruir',
    descripcion: 'Para recuperar dientes debilitados o ausentes, y con ellos tu forma de masticar.',
  },
];

export const TRATAMIENTOS = [
  {
    slug: 'carillas',
    rayosX: 'Antes de planificar las carillas, una radiografía permite revisar la salud de los dientes y de sus raíces.',
    nombre: 'Carillas dentales',
    corto: 'Carillas',
    area: 'estetica',
    icono: 'carillas',
    resumen: 'Láminas delgadas que cambian el color, la forma o el tamaño de los dientes frontales.',
    descripcion:
      'Las carillas son láminas muy delgadas, de porcelana o de resina compuesta, que se adhieren a la cara visible del diente. Se usan para modificar el color, la forma o el tamaño de dientes que se ven manchados, desgastados, pequeños o con espacios.',
    paraQuien: [
      'Manchas que no salen con un blanqueamiento',
      'Bordes desgastados o levemente fracturados',
      'Espacios pequeños entre los dientes frontales',
      'Forma o tamaño que quieres armonizar',
    ],
    proceso: [
      ['Evaluación', 'Revisamos tus dientes y encías y conversamos sobre lo que quieres cambiar.'],
      ['Diseño', 'Planificamos el color y la forma para que se vean naturales con tu rostro.'],
      ['Preparación y colocación', 'Se prepara el diente y se adhiere la carilla, cuidando el ajuste y la mordida.'],
      ['Control', 'Revisamos cómo quedó y te indicamos los cuidados para mantenerla.'],
    ],
    faqs: [
      ['¿Las carillas sirven para todas las personas?', 'No siempre. Se necesitan dientes y encías sanos. Tu odontólogo evalúa si son la mejor opción o si conviene otra alternativa.'],
      ['¿Cómo se cuidan?', 'Con cepillado e hilo dental diarios y controles periódicos. También conviene evitar morder objetos duros.'],
    ],
  },
  {
    slug: 'restauraciones',
    rayosX: 'La radiografía muestra caries entre dientes o bajo una restauración antigua, que no se ven a simple vista.',
    nombre: 'Restauraciones',
    corto: 'Restauraciones',
    area: 'cuidado',
    icono: 'restauraciones',
    resumen: 'Reparan dientes con caries o fracturas y recuperan su forma y su función.',
    descripcion:
      'Una restauración repone la parte del diente que se perdió por caries, desgaste o fractura. Habitualmente se hace con resina compuesta del color del diente, y busca recuperar la forma, la función al masticar y la estética.',
    paraQuien: [
      'Caries, visibles o detectadas en una revisión',
      'Dientes fracturados o con bordes rotos',
      'Restauraciones antiguas desgastadas o filtradas',
    ],
    proceso: [
      ['Diagnóstico', 'Revisamos el diente y, si corresponde, pedimos una radiografía.'],
      ['Preparación', 'Con anestesia local si se necesita, se retira el tejido dañado.'],
      ['Restauración', 'Se coloca el material en capas y se modela la forma del diente.'],
      ['Ajuste y pulido', 'Comprobamos la mordida y pulimos para que quede cómodo y liso.'],
    ],
    faqs: [
      ['¿Duele?', 'Se trabaja con anestesia local cuando es necesario, para que el procedimiento sea cómodo. Si sientes molestia en cualquier momento, avísanos.'],
      ['¿Cuánto dura una restauración?', 'Depende del tamaño, de la ubicación, de tu higiene y de cómo muerdes. Los controles periódicos ayudan a detectar el desgaste a tiempo.'],
    ],
  },
  {
    slug: 'limpiezas-dentales',
    rayosX: 'Si corresponde, una radiografía de control permite revisar el hueso que sostiene tus dientes y las caries entre piezas.',
    nombre: 'Limpiezas dentales',
    corto: 'Limpiezas',
    area: 'cuidado',
    icono: 'limpiezas',
    resumen: 'Retiran el sarro y la placa que el cepillado no alcanza, para cuidar dientes y encías.',
    descripcion:
      'La limpieza dental profesional retira el sarro y la placa bacteriana que el cepillado no alcanza a sacar. Es una de las medidas más importantes para prevenir caries y enfermedad de las encías, y además permite revisar el estado general de tu boca.',
    paraQuien: [
      'Control preventivo periódico',
      'Encías que sangran al cepillarte',
      'Manchas superficiales o sarro acumulado',
    ],
    proceso: [
      ['Revisión', 'Miramos el estado de tus dientes y encías antes de empezar.'],
      ['Retiro de sarro y placa', 'Se eliminan los depósitos de la superficie y de la línea de la encía.'],
      ['Pulido', 'Se pulen los dientes para que la placa se adhiera menos.'],
      ['Indicaciones', 'Te mostramos cómo mejorar tu higiene en casa según lo que vimos.'],
    ],
    faqs: [
      ['¿Cada cuánto conviene hacerla?', 'Para muchas personas, cada seis meses. Tu odontólogo puede indicar otra frecuencia según tu caso.'],
      ['¿Desgasta el esmalte?', 'No. Retira los depósitos que hay sobre el diente; bien hecha, no desgasta el esmalte.'],
    ],
  },
  {
    slug: 'implantes',
    rayosX: 'La radiografía permite evaluar el hueso disponible y la posición de los dientes vecinos antes de planificar el implante.',
    nombre: 'Implantes dentales',
    corto: 'Implantes',
    area: 'reponer',
    icono: 'implantes',
    resumen: 'Reponen la raíz de un diente perdido con una pieza de titanio que sostiene una corona.',
    descripcion:
      'Un implante es un pequeño tornillo, habitualmente de titanio, que se coloca en el hueso maxilar y reemplaza la raíz del diente ausente. Una vez integrado al hueso, sostiene una corona u otra prótesis que se ve y funciona como un diente natural.',
    paraQuien: [
      'Pérdida de uno o más dientes',
      'Prótesis removible que se mueve o incomoda',
      'Quienes quieren reponer un diente sin desgastar los vecinos',
    ],
    proceso: [
      ['Evaluación', 'Revisamos tu boca, tu salud general y, con estudios de imagen, el hueso disponible.'],
      ['Plan de tratamiento', 'Definimos las etapas, los tiempos aproximados y los materiales contigo.'],
      ['Colocación del implante', 'Se instala la pieza en el hueso, habitualmente con anestesia local.'],
      ['Integración y control', 'El hueso se une al implante con el tiempo, y lo vamos controlando.'],
      ['Corona o prótesis', 'Sobre el implante se instala la pieza definitiva y se ajusta la mordida.'],
    ],
    faqs: [
      ['¿Todas las personas pueden tener implantes?', 'Se necesita hueso y encías sanos y una evaluación de tu salud general. Tu odontólogo te dirá si es una opción para ti.'],
      ['¿Cuánto demora el tratamiento?', 'Varía en cada caso, porque el implante necesita un tiempo para integrarse al hueso. En la evaluación te entregamos un plan con sus etapas.'],
    ],
  },
  {
    slug: 'endodoncias',
    rayosX: 'La radiografía muestra la forma de las raíces y de los conductos, y se usa antes, durante y después del tratamiento.',
    nombre: 'Endodoncias',
    corto: 'Endodoncias',
    area: 'cuidado',
    icono: 'endodoncias',
    resumen: 'Tratan el nervio inflamado o infectado para conservar tu diente en vez de extraerlo.',
    descripcion:
      'La endodoncia, o tratamiento de conducto, limpia y sella el interior del diente cuando la pulpa —el tejido con nervios y vasos sanguíneos— está inflamada o infectada. Su objetivo es eliminar la infección y conservar el diente natural en lugar de extraerlo.',
    paraQuien: [
      'Dolor intenso o que no se va',
      'Sensibilidad prolongada al frío o al calor',
      'Inflamación o un granito en la encía',
      'Un diente que se oscureció después de un golpe',
    ],
    proceso: [
      ['Diagnóstico', 'Examinamos el diente y pedimos una radiografía para ver el estado de la raíz.'],
      ['Acceso con anestesia', 'Con anestesia local se llega al interior del diente.'],
      ['Limpieza de conductos', 'Se retira el tejido afectado y se desinfectan los conductos.'],
      ['Sellado y restauración', 'Se sellan los conductos y se reconstruye el diente, con frecuencia con una corona.'],
    ],
    faqs: [
      ['¿Es doloroso?', 'Se realiza con anestesia local, y su propósito es aliviar el dolor que causa la infección.'],
      ['¿Después necesito una corona?', 'Con frecuencia sí, porque un diente tratado queda más frágil. Tu odontólogo te indicará lo adecuado en tu caso.'],
    ],
  },
  {
    slug: 'coronas',
    rayosX: 'Una radiografía revisa la raíz y el estado del diente antes de cubrirlo con una corona.',
    nombre: 'Coronas dentales',
    corto: 'Coronas',
    area: 'reponer',
    icono: 'coronas',
    resumen: 'Cubren por completo un diente debilitado para protegerlo y devolverle su forma.',
    descripcion:
      'Una corona es una cubierta que reviste todo el diente por fuera, como un casquete. Se indica cuando el diente está muy debilitado, fracturado o muy restaurado, después de una endodoncia, y también se usa sobre los implantes. Puede ser de porcelana, de metal-porcelana u otros materiales.',
    paraQuien: [
      'Dientes muy debilitados o fracturados',
      'Dientes tratados con endodoncia',
      'Restauraciones grandes que ya no se sostienen',
      'Sobre un implante, para reponer el diente visible',
    ],
    proceso: [
      ['Evaluación', 'Revisamos el diente y la mordida para decidir el tipo de corona.'],
      ['Preparación', 'Se talla el diente y se toman los registros para fabricar la corona.'],
      ['Corona provisoria', 'Mientras se fabrica la definitiva, el diente queda protegido.'],
      ['Instalación', 'Se cementa la corona definitiva y se ajusta para que muerdas cómodo.'],
    ],
    faqs: [
      ['¿De qué material puede ser?', 'Hay porcelana, circonio y combinaciones con metal. Tu odontólogo recomienda según la ubicación del diente, tu mordida y la estética que buscas.'],
      ['¿Cómo se cuida?', 'Igual que un diente natural: higiene diaria, hilo dental y controles. Debajo de la corona sigue habiendo un diente que puede tener caries.'],
    ],
  },
  {
    slug: 'protesis',
    rayosX: 'La radiografía ayuda a evaluar los dientes y el hueso que van a sostener la prótesis.',
    nombre: 'Prótesis dentales',
    corto: 'Prótesis',
    area: 'reponer',
    icono: 'protesis',
    resumen: 'Reemplazan dientes ausentes para recuperar la masticación, el habla y la estética.',
    descripcion:
      'Las prótesis reemplazan uno o varios dientes perdidos. Pueden ser removibles, que te sacas para limpiarlas, o fijas, que quedan cementadas sobre dientes o implantes. Ayudan a masticar mejor, a hablar con claridad y a recuperar la armonía de tu sonrisa.',
    paraQuien: [
      'Ausencia de uno, varios o todos los dientes',
      'Dificultad para masticar o para pronunciar',
      'Una prótesis antigua que ya no ajusta bien',
    ],
    proceso: [
      ['Evaluación y plan', 'Revisamos tu boca y te explicamos qué tipo de prótesis te conviene.'],
      ['Registros', 'Se toman impresiones y medidas de tu mordida para fabricarla a tu medida.'],
      ['Prueba y ajustes', 'La probamos antes de la entrega para afinar el ajuste y la estética.'],
      ['Entrega e indicaciones', 'Te enseñamos a usarla y a limpiarla, y agendamos un control.'],
    ],
    faqs: [
      ['¿Cuál es la diferencia entre una prótesis fija y una removible?', 'La removible se saca para limpiarla; la fija queda cementada sobre dientes o implantes. Según tu caso, tu odontólogo te dirá cuál es mejor.'],
      ['¿Cuesta acostumbrarse?', 'Es normal: los primeros días puede sentirse extraña al hablar y al comer. Los controles de ajuste ayudan a que quede cómoda.'],
    ],
  },
];

export const porSlug = (slug) => TRATAMIENTOS.find((t) => t.slug === slug);
export const delArea = (id) => TRATAMIENTOS.filter((t) => t.area === id);
