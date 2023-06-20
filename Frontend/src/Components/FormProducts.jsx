import { useEffect, useState } from 'react';

function FormProducts() {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');

    const url = "http://localhost:4500/product"

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            if(data.error)return;
            setProductos(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    const handlePrecioChange = (event) => {
        setPrecio(event.target.value);
    };

    const agregarProducto = async () => {
        try {
            await fetch('http://localhost:4500/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, precio }),
            });
            obtenerProductos();
            setNombre('');
            setPrecio('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Agregar Producto</h2>
            <div>
                <input className='inputText' type="text" value={nombre} onChange={handleNombreChange} placeholder="Nombre" />
                <input className='inputText' type="text" value={precio} onChange={handlePrecioChange} placeholder="Precio" />
                <button onClick={agregarProducto}>Agregar</button>
            </div>

            <h2>Lista de Productos</h2>
            <div>
                {productos.length && productos.map((producto) => (
                    <div className='card' key={producto.id}>
                        <h3>{producto.nombre}</h3>
                        <p>Precio: ${producto.precio}</p>        
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FormProducts;