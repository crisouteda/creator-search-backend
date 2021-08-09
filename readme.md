# Creator search backend
This serverless app is used to allow interaction between our library frontend and our api.
The apikeys used are on ssm, frontend only needs to specify environment (prod or staging, see below)
## Endpoints
### `getVoiceParameteres` and `getTemplateParameters`
This endpoints return the allowed filtering parameters for their respective resource
 - Path: `/getVoiceParameters` and `/getTemplateParameters`
 - Method: `GET`
 - Allowed query strig parameters
    - `debug`: `true` on staging, `false` on prod

### `getVoices` and `getTemplates`
This endpoint returns voices or templates, already filtered.
 - Path: `/getVoices` and `/getTemplates`
 - Method: `POST`
 - Body parameters:
    - `debug`: true on staging, `false` on prod
    - `filters`: object containing key-value pairs that are in line with allowed filtering parameters


## Deployment
staging:
```
sls deploy
```
prod:
```
sls deploy -s prod
```