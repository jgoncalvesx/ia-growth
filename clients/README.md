# Clientes

Este diretório organiza contexto e entregáveis por cliente.
O Antigravity usa esses arquivos como memória persistente entre sessões.

## Como usar
- Ao iniciar uma sessão, diga: *"estamos trabalhando com o cliente X"*
- O AI lê o `README.md` da pasta e já tem todo o contexto

## Clientes
| Cliente | Pasta | Status |
|---|---|---|
| MedMentorIA | [`MedMentorIA/`](MedMentorIA/README.md) | ativo |

## Estrutura de Pasta por Cliente
```
clients/
  NomeCliente/
    README.md              ← contexto geral do cliente (produto, público, posicionamento)
    google-ads/            ← análises de campanhas Google Ads
    meta-ads/              ← análises de campanhas Meta Ads
    crm/                   ← dados e análises de CRM
    estrategia/            ← documentos estratégicos
```
