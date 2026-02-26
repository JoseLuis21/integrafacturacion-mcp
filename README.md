# @integrafacturacion/mcp

MCP Server para consultar datos de facturación electrónica chilena desde la API IntegraFacturación.

Permite a modelos de lenguaje (Claude, etc.) consultar documentos tributarios, folios, estadísticas y más mediante el protocolo MCP (Model Context Protocol).

## Tools disponibles

| Tool | Descripción |
|------|-------------|
| `get_user_info` | Info del usuario autenticado (nombre, email, estado) |
| `get_certificate_info` | Estado del certificado digital (vencimiento, titular) |
| `list_documents` | Listar DTEs con filtros (tipo, estado, fechas, paginación) |
| `get_document` | Detalle de un documento por ID |
| `get_document_stats` | Estadísticas: totales emitidos, montos, por tipo DTE |
| `get_numeration_summary` | Resumen de folios disponibles por tipo |
| `get_last_folio` | Último folio usado para un tipo de DTE |

## Instalación

```bash
npm install
npm run build
```

## Variables de entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `API_BASE_URL` | URL de la API IntegraFacturación | `http://localhost:5058` |
| `API_KEY` | API Key de autenticación (requerida) | — |

## Uso con Claude Desktop

Agregar a `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "integrafacturacion": {
      "command": "node",
      "args": ["/ruta/a/integrafacturacion-mcp/dist/index.js"],
      "env": {
        "API_BASE_URL": "https://api.integrafacturacion.cl",
        "API_KEY": "tu_api_key"
      }
    }
  }
}
```

## Uso con npx (una vez publicado)

```json
{
  "mcpServers": {
    "integrafacturacion": {
      "command": "npx",
      "args": ["-y", "@integrafacturacion/mcp"],
      "env": {
        "API_BASE_URL": "https://api.integrafacturacion.cl",
        "API_KEY": "tu_api_key"
      }
    }
  }
}
```

## Tipos de DTE soportados

| Código | Tipo |
|--------|------|
| 33 | Factura Electrónica |
| 34 | Factura Exenta |
| 39 | Boleta Electrónica |
| 41 | Boleta Exenta |
| 46 | Factura de Compra |
| 52 | Guía de Despacho |
| 56 | Nota de Débito |
| 61 | Nota de Crédito |

## Desarrollo

```bash
npm install
npm run dev    # Watch mode
npm run build  # Build
npm start      # Run
```

## Publicación a npm con versiones automáticas

Este repo usa [Changesets](https://github.com/changesets/changesets) + GitHub Actions.

### Configuración inicial

1. Crear el secret `NPM_TOKEN` en GitHub (`Settings > Secrets and variables > Actions`).
2. El token debe tener permisos para publicar en el scope `@integrafacturacion`.
3. Si la organización exige 2FA para publish, usa un token con `bypass 2fa`.

### Flujo de versiones

1. Para cada cambio que quieras versionar, crea un changeset:
   ```bash
   pnpm changeset
   ```
2. Haz commit del archivo en `.changeset/*.md` junto a tu cambio.
3. Al hacer merge a `main`, el workflow `Release` crea/actualiza un PR de release con el nuevo versionado.
4. Cuando ese PR se mergea, el mismo workflow publica automáticamente a npm.
