## Parcial Practico

Esta es la version v1.0.0 del parcial practico

### Instalar dependencias

```bash
$ npm install
```

## Correr el projecto

```bash
$ npm run start:dev
```

## Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

### Consideraciones:

Dentro de la carpeta llamada collections estan los diferentes endpoints para usar en postman

#### ✈️ Aerolíneas

| Método | Caso requerido                                               | Nombre en Postman                        |
|--------|--------------------------------------------------------------|------------------------------------------|
| POST   | Crear una aerolínea válida                                   | Crear aerolinea                          |
| POST   | Crear una aerolínea inválida                                 | Crear aerolinea (Fecha incorrecta)       |
| GET    | Obtener todas las aerolíneas                                 | Obtener aerolineas                       |
| GET    | Obtener una aerolínea por ID                                 | Obtener aerolinea por id                 |
| GET    | Obtener una aerolínea por un ID que no existe                | Obtener aerolinea por (id Incorrecto)    |
| PUT    | Actualizar una aerolínea                                     | Actualizar aerolinea                     |
| PUT    | Actualizar una aerolínea con un ID que no existe             | Actualizar aerolinea (incorrecta)   |
| DELETE | Eliminar una aerolínea por su ID                             | Borrar aeropuerto *(renombrar)*          |
| DELETE | Eliminar una aerolínea con un ID que no existe              | Borrar aeropuerto (incorrecto) *(idem)*  |


#### 🛫 Aeropuertos

| Método | Caso requerido                                               | Nombre en Postman                            |
|--------|--------------------------------------------------------------|----------------------------------------------|
| POST   | Crear un aeropuerto válido                                   | Crear aeropuerto                             |
| POST   | Crear un aeropuerto inválido                                 | Crear aeropuerto (codigo incorrecto)         |
| GET    | Obtener todos los aeropuertos                                | Obtener aeropuerto                           |
| GET    | Obtener un aeropuerto por ID                                 | Obtener aeropuerto por id                    |
| GET    | Obtener un aeropuerto por un ID que no existe                | Obtener aeropuerto por id Incorrecto         |
| PUT    | Actualizar un aeropuerto                                     | Actualizar aeropuerto                         |
| PUT    | Actualizar un aeropuerto con un ID que no existe             | Actualizar aeropuerto (incorrecto)        |
| DELETE | Eliminar un aeropuerto por ID                                | Borrar aeropuerto                             |
| DELETE | Eliminar un aeropuerto con un ID que no existe               | Borrar aeropuerto (incorrecto)               |

#### 🔁 Aerolíneas - Aeropuertos

| Método | Caso requerido                                               | Nombre en Postman                                   |
|--------|--------------------------------------------------------------|-----------------------------------------------------|
| POST   | Asociar un aeropuerto a una aerolínea                        | Asociar aeropuerto a aerolinea                     |
| POST   | Asociar un aeropuerto que no existe a una aerolínea          | Asociar aeropuerto a aerolinea (No existe)         |
| GET    | Obtener todos los aeropuertos que cubre una aerolínea        | Aeropuertos de aerolinea                           |
| GET    | Obtener un aeropuerto asociado a una aerolínea               | Aeropuerto de aerolinea                            |
| GET    | Obtener un aeropuerto que no esté asociado a una aerolínea   | Aeropuerto de aerolinea (no exista)               |
| PUT    | Actualizar los aeropuertos que están asociados a una aerolínea | Actualizar aeropuertos de aerolinea           |
| PUT    | Actualizar los aeropuertos con un aeropuerto inexistente     | Actualizar aeropuertos de aerolinea (incorrecto)   |
| DELETE | Eliminar un aeropuerto previamente asociado a una aerolínea  | Eliminar un aeropuerto de aerolinea                |
| DELETE | Eliminar un aeropuerto no asociado a una aerolínea           | Eliminar un aeropuerto de aerolinea (incorrecto)   |

#### 🛠️ Notas sobre las variables de entorno

En tu colección de Postman, se usan **variables de colección** para reutilizar IDs generados dinámicamente entre peticiones:

- `aerolineaId`:  
  Se guarda automáticamente al ejecutar la prueba **"Crear aerolinea"**, gracias al siguiente script en la pestaña **Tests**:

  ```javascript
  const jsonData = pm.response.json();
  if (jsonData && jsonData.id) {
      pm.collectionVariables.set("aerolineaId", jsonData.id);
  }


