
const articuloFake = {
    id: 1,
    titulo: "Gold Standard Whey",
    etiquetas: [1, 3, 4],
    tipoSuplemento: 1,
    ingredientes: [1, 4, 6],
    ingActivo: 1,
    imagen: "https://gnc.com.mx/media/catalog/product/cache/d5c3974ef86b1c3c0d3b6947ccba778f/1/0/107206001-on-gold-standard-100-whey-choc-5-lbs.png",
    tamano: 30,
    calorias: 120,
    proteina: 21,
    lipidos: 1,
    carbos: 2,
    perfilAminos: 1,
    perfilAG: 1,
    tiposOmegas: []
};


const perfilesAcidosGrasos = [
    {
        id: 1,
        AcidosGrasos: [
            { id: 1, cantidad: 0 },
            { id: 2, cantidad: 0 }
        ]
    },
    {
        id: 2,
        AcidosGrasos: [
            { id: 1, cantidad: 3 },
            { id: 2, cantidad: 2 }
        ]
    }
];

const perfilesAminosFake = [
    {
        id: 1,
        aminos: [
            { id: 1, cantidad: 5.3 },
            { id: 2, cantidad: 11 },
            { id: 3, cantidad: 7.7 },
            { id: 4, cantidad: 2 },
            { id: 5, cantidad: 7.7 },
            { id: 6, cantidad: 7.7 },
            { id: 7, cantidad: 5.3 },
            { id: 8, cantidad: 5.3 },
            { id: 9, cantidad: 11 },
            { id: 10, cantidad: 11 },
            { id: 11, cantidad: 11 },
            { id: 12, cantidad: 11 },
            { id: 13, cantidad: 7.7 },
            { id: 14, cantidad: 11 },
            { id: 15, cantidad: 11 },
            { id: 16, cantidad: 5.3 },
            { id: 17, cantidad: 7.7 },
            { id: 18, cantidad: 11 },
            { id: 19, cantidad: 7.7 },
            { id: 20, cantidad: 7.7 },
        ],
    },
    {
        id: 2,
        aminos: [
            { id: 1, cantidad: 0 },
            { id: 2, cantidad: 0 },
            { id: 3, cantidad: 0 },
            { id: 4, cantidad: 0 },
            { id: 5, cantidad: 0 },
            { id: 6, cantidad: 0 },
            { id: 7, cantidad: 0 },
            { id: 8, cantidad: 0 },
            { id: 9, cantidad: 0 },
            { id: 10, cantidad: 0 },
            { id: 11, cantidad: 0 },
            { id: 12, cantidad: 0 },
            { id: 13, cantidad: 0 },
            { id: 14, cantidad: 0 },
            { id: 15, cantidad: 0 },
            { id: 16, cantidad: 0 },
            { id: 17, cantidad: 0 },
            { id: 18, cantidad: 0 },
            { id: 19, cantidad: 0 },
            { id: 20, cantidad: 0 },
        ],
    }
];



const listaAcidosGrasos = [
    { id: 1, nombre: "DHA" },
    { id: 2, nombre: "EPA" }
];

const listaAlergenos = [
    { id: 1, nombre: "lactosa" },
    { id: 2, nombre: "caseina" },
    { id: 3, nombre: "nueces" }
];

/* const listaAminoacidos = [
    new Aminoacido(1, "Serina"),
    new Aminoacido(2, "Treonina"),
    new Aminoacido(3, "Glutamina"),
    new Aminoacido(4, "Asparagina"),
    new Aminoacido(5, "Tirosina"),
    new Aminoacido(6, "Cisteina"),
    new Aminoacido(7, "Glicina"),
    new Aminoacido(8, "Alanina"),
    new Aminoacido(9, "Valina"),
    new Aminoacido(10, "Leucina"),
    new Aminoacido(11, "Isoleucina"),
    new Aminoacido(12, "Metionina"),
    new Aminoacido(13, "Prolina"),
    new Aminoacido(14, "Fenilalanina"),
    new Aminoacido(15, "Triptofano"),
    new Aminoacido(16, "Acido Aspartico"),
    new Aminoacido(17, "Acido Glutamico"),
    new Aminoacido(18, "Lisina"),
    new Aminoacido(19, "Arginina"),
    new Aminoacido(20, "Histidia")
]; */

const listaAminoacidos = [
    { id: 1, nombre: "Serina" },
    { id: 2, nombre: "Treonina" },
    { id: 3, nombre: "Glutamina" },
    { id: 4, nombre: "Asparagina" },
    { id: 5, nombre: "Tirosina" },
    { id: 6, nombre: "Cisteina" },
    { id: 7, nombre: "Glicina" },
    { id: 8, nombre: "Alanina" },
    { id: 9, nombre: "Valina" },
    { id: 10, nombre: "Leucina" },
    { id: 11, nombre: "Isoleucina" },
    { id: 12, nombre: "Metionina" },
    { id: 13, nombre: "Prolina" },
    { id: 14, nombre: "Fenilalanina" },
    { id: 15, nombre: "Triptofano" },
    { id: 16, nombre: "Acido Aspartico" },
    { id: 17, nombre: "Acido Glutamico" },
    { id: 18, nombre: "Lisina" },
    { id: 19, nombre: "Arginina" },
    { id: 20, nombre: "Histidia" }
];

const listaCertificaciones = [
    { id: 1, nombre: "Labdoor" },
    { id: 2, nombre: "FDA" },
    { id: 3, nombre: "COFEPRIS" }
];

const listaEtiquetas = [
    { id: 1, etiqueta: "Etiqueta 1" },
    { id: 2, etiqueta: "Etiqueta 2" },
    { id: 3, etiqueta: "Etiqueta 3" },
    { id: 4, etiqueta: "Etiqueta 4" },
    { id: 5, etiqueta: "Etiqueta 5" },
    { id: 6, etiqueta: "Etiqueta 6" }
];

const listaIngredientes = [
    { id: 1, nombre: "Proteina concentrada de suero de leche" },
    { id: 2, nombre: "Proteina aislada de suero de leche" },
    { id: 3, nombre: "Sacarosa" },
    { id: 4, nombre: "Sucralosa" },
    { id: 5, nombre: "Stevia" },
    { id: 6, nombre: "Goma Xanthan" },
    { id: 7, nombre: "Vainillina" }
];

const listaOmegas = [
    { id: 1, tipo: "Omega3", numero: 3 },
    { id: 2, tipo: "Omega6", numero: 6 },
    { id: 3, tipo: "Omega9", numero: 9 }
];

const reportesFake = [
    {
        id: 1,
        Usuario: "Sam",
        Fecha: "25-04-2022",
        Articulo: 1,
        Resumen: "Nmmn xD",
        Contenido: "Hace falta desarrollar todo el articulo nmmn",
        Resuelto: false
    },
    {
        id: 2,
        Usuario: "Sam",
        Fecha: "25-04-2022",
        Articulo: 1,
        Resumen: "Nmmn xD",
        Contenido: "Hace falta desarrollar todo el articulo nmmn",
        Resuelto: false
    }
];

const tiposSuplemento = [
    { id: '1', tipo: "proteina" },
    { id: '2', tipo: "omegas" },
    { id: '3', tipo: "sustancia especifica" }
];

const tweetsFake =
    [{
        data:
        {
            created_at: "2022-04-28T01:57:27.000Z",
            text: "Listen, I can’t do miracles ok https://t.co/z7dvLMUXy8",
            id: "1519495982723084290",
            author_id: "44196397",
            attachments: {
                media_keys: [
                    "3_1519495979866771459"
                ]
            }
        }
        ,
        includes: {
            users:
            {
                id: "44196397",
                profile_image_url: "https://pbs.twimg.com/profile_images/1521544530230595584/my_Sigxw_normal.jpg",
                url: "",
                username: "elonmusk",
                name: "Elon Musk"
            }

        }
    },
    {
        data:
        {
            created_at: "2022-04-28T00:56:58.000Z",
            id: "1519480761749016577",
            text: "Next I’m buying Coca-Cola to put the cocaine back in",
            author_id: "44196397"
        }
        ,
        includes:
        {
            users:
            {
                profile_image_url: "https://pbs.twimg.com/profile_images/1521544530230595584/my_Sigxw_normal.jpg",
                url: "",
                name: "Elon Musk",
                id: "44196397",
                username: "elonmusk"
            }

        }
    }];
export function getArticuloFake() {
    return articuloFake;
}

export function getPerfilAGFake() {
    return perfilesAcidosGrasos;
}

export function getPerfilAminosFake() {
    return perfilesAminosFake;
}

export function getAcidosGrasos() {
    return listaAcidosGrasos;
}

export function getAlergenos() {
    return listaAlergenos;
}

export function getAminos() {
    return listaAminoacidos;
}

export function getCertificaciones() {
    return listaCertificaciones;
}

export function getEtiquetas() {
    return listaEtiquetas;
}

export function getIngredientes() {
    return listaIngredientes;
}

export function getOmegas() {
    return listaOmegas;
}

export function getReportesFake() {
    return reportesFake;
}

export function getResultadosFake() {
    let output = [];
    for (let x = 0; x < 20; x++) {
        output.push(getArticuloFake());
    }

    return output;
}

export function getTiposSuplementos() {
    return tiposSuplemento;
}

export function getTweetsFake() {
    return tweetsFake;
}

export function getAcidoGrasoById(id) {
    let ans;
    listaAcidosGrasos.map((item) => item.id == id && (ans = item));
    return ans;
}

export function getAminoById(id) {
    let ans;
    listaAminoacidos.map((item) => item.id == id && (ans = item));
    return ans;
}

export function getEtiquetaByID(id) {
    let ans;
    listaEtiquetas.map((item) => item.id == id && (ans = item));
    return ans;
}

export function getOmegaByID(id) {
    let ans;
    listaOmegas.map((item) => item.id == id && (ans = item));
    return ans;
}

export function getPerfilAGById(id) {
    let ans;
    perfilesAcidosGrasos.map((item) => item.id == id && (ans = item));
    return ans;
}

export function getPerfilAminosById(id) {
    let ans;
    perfilesAminosFake.map((item) => item.id == id && (ans = item));
    return ans;
}