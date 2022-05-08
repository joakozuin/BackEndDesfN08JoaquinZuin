
//Arreglo para persistencia de datos
//
let productos=[
  {
    id:1,
    titulo:'Televisor',
    precio:20000,
    thumbnail:'https://'
  },
  {
    id:2,
    titulo:'Mesa',
    precio:5000,
    thumbnail:'https://'
  },
]

let ultId=productos.length

//console.log(`Tamaño del arreglo:${ultId}`)

module.exports = {
  //Envia todos los productos
  //
  getProductos: (req, res) => {
    res.json({
      mensage: "Lista de Productos de la BD",
      productos,
    });
  },

  //Envia un producto por id
  //
  getProducto: (req, res, next) => {
    const { id } = req.params;
    let idS=false

    productos.forEach((producto , i )=>{
      if ( producto.id === Number(id)){
         idS=true
      }              
    });

    if (!idS) {
      const error = new Error(`(get)-No se encuentra el producto con el id: ${id}`);
      error.httpStatusCode = 400;

      return next(error);  
    }
    

    const producto = productos[id-1];
    res.json({
      mensage: `Producto con id:${id}`,
      producto,
    });
  },

  //Agrega un producto
  //
  postProducto: (req, res) => {
    const { titulo, precio, thumbnail } = req.body;

    ultId = ultId + 1;

    let producto = {
      id: ultId,
      titulo,
      precio,
      thumbnail,
    };
    productos.push(producto);
    res.json({
      mensage: `Se agregó el producto con id:${ultId}`,
      producto,
    });
  },

  //Agrega un producto desde un formulario
  //
  postFormProducto: (req, res) => {
    const { titulo, precio, thumbnail } = req.body;
    ultId = ultId + 1;
    let producto = {
      id: ultId,
      titulo,
      precio,
      thumbnail,
    };
    productos.push(producto);
    res.json({
      mensage: `Se agregó el producto con id:${ultId} desde un formulario`,
      producto,
    });
  },

  //Modifica un producto
  //
  putProducto: (req, res,next) => {
    const { id } = req.params;
    const { titulo, precio, thumbnail } = req.body;

    let idS=false

    let producto = {
      id: id,
      titulo,
      precio,
      thumbnail,
    };

    productos.forEach((producto , i )=>{
      if ( producto.id === Number(id)){
           productos[i].titulo=titulo
           productos[i].precio=precio
           productos[i].thumbnail=thumbnail
           idS=true
      }              
    });

    if (!idS) {
      const error = new Error(`(put)-No se encuentra el producto con el id: ${id}`);
      error.httpStatusCode = 400;
      return next(error);
    }

    res.json({
      mensage: `Se modificó el producto con id:${id}`,
      producto
    });
  },

  //Borrar un producto
  //
  deleteProducto: (req, res,next) => {
    const { id } = req.params;

    let idS=false
   
    let producto
    productos.forEach((prod, i)=>{
      if(prod.id === Number(id)){
        producto = {
          id: id,
          titulo:prod.titulo,
          precio:prod.precio,
          thumbnail:prod.thumbnail
        };
         productos.splice(i,1)
         idS=true
      }
    });

    if (!idS) {
      const error = new Error(`(delete)-No se encuentra el producto con el id: ${id}`);
      error.httpStatusCode = 400;
      return next(error);
    }

    res.json({
      mensage: `Se borró el producto con id:${id}`,
      producto
    });
  },

};