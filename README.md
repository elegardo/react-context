# Ejemplo usando multiples custom useContext

Esta App usa 2 APIs distintas para construir 2 diferentes `Provider` personalizados para un mismo `Context` lo que permite reutilizar componentes para representar la data.

## Objetivo

Demostrar que externalizar el manejo de estado de los containers con el hook `useContext` permite una mejor reutilización de containers y components.

## APIs

Para el ejemplo se usan las siguientes:

| Name  | Url | Type | ApiKey
| ----- | --- | ---- | ------
| TVShow  | http://api.tvmaze.com  | public | none
| Marvel (*)  | https://gateway.marvel.com/v1/public  | private | required

(*) Para obtener una ApiKey para la Api de Marvel se deben seguir las instrucciones en https://developer.marvel.com/ y reemplazar el codigo obtenido en `{apikey}` y calcular el `{hash}` según las instrucciones.

## Carga masiva

Con el objetivo de crear un buscador con un listado precargado, se crearon scripts en python por cada Api. Cada script consume de forma masiva las Apis y escriben en el fichero `options.json` para el uso de cada `Provider`.

Por ejemplo, la ejecución:

```python
python get_api_marvel.py
```

sobreescribira el archivo `options.json` de la ruta `/src/hooks/marvel/options.json` con un listado de todos los personajes de Marvel entregados por la Api.

(*) Se deben ejecutar cada uno de los script de la carpeta `/python` para la precarga de datos de cada buscador y solo es necesario ejecutarlo nuevamente si se desea actualizar el listado de personajes o nuevas series.


## Estructura

Los hooks se encuentran en la carpeta /src/hooks/{name} y cada uno contiene 3 archivos:

```javascript

callApi.tsx  //llamadas APIs externas
options.json //listado precargado con script
provider.tsx //implementación del contexto

```

El archivo `provider.tsx` contiene toda la funcionalidad y manejo de estado necesario para que el `Provider` funcione.

Cada `Provider` ofrece valores distintos para el mismo contexto, mientras cada uno de ellos respete valores como los de la interfaz `ValueContext` el `Provider` sera válido para el contexto.

```javascript

 export interface ValueContext {
    options: any[];
    cover: Cover;
    items: Item[];
    setId(id: string): void
}

```

Open browser http://localhost:8080/