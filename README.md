# full-dte-mcp

MCP Server para consultar datos de facturación electrónica chilena desde la API FullDTE.

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
| `API_BASE_URL` | URL de la API FullDTE | `http://localhost:5058` |
| `API_KEY` | API Key de autenticación (requerida) | — |

## Uso con Claude Desktop

Agregar a `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "full-dte": {
      "command": "node",
      "args": ["/ruta/a/full-dte-mcp/dist/index.js"],
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
    "full-dte": {
      "command": "npx",
      "args": ["-y", "full-dte-mcp"],
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
