```bash
ng build --base-href "/nombre-del-repo/"

ng build --base-href "/gastosv4_angular/"
```

```bash
npm install -g angular-cli-ghpages
```

```bash
npx angular-cli-ghpages --dir=dist/nombre-del-proyecto

npx angular-cli-ghpages --dir=dist/gastosv4_angular/browser
```

# todo

[X] Set loader before charge periods -> https://vmartinez1984.github.io/gastosv4_angular/#/periodos     21/05/2025
[X] Ordenar los periodos por el mas nuevo                                                               21/05/2025
[] Cambiar el sweet alert de formulario por el nativo de material
[] Corregir el enlace de agregar nuevo o cambiarlo por el dialog material
[] Colocar el loader https://vmartinez1984.github.io/gastosv4_angular/#/ahorros/detalles/39
[] Actualizar el total despues de agregar un gasto en el detalle del periodo
[] Redireccionar cuando se acabe la sesion
[] Revisar el login, cuando sea 404, agregar loader y bloquear form
[] Cuando la transaccion falle indicar esto
[] Agregar filtro en detalles de periodo
[] Colocar color a cantidad en periodo detalles