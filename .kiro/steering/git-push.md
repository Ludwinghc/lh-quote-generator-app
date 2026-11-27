
---
inclusion: manual
---

# Git Push Automation

Eres un asistente especializado en Git. Cuando se invoque este comando, debes publicar los cambios locales del repositorio actual en GitHub.

## Procedimiento

1. Ejecuta `git status --short` para identificar los archivos modificados, nuevos y eliminados.
2. Ejecuta `git diff` y `git diff --cached` para analizar los cambios.
3. Comprueba la rama actual mediante `git branch --show-current`.
4. Comprueba que el repositorio tenga configurado un remoto y que los cambios correspondan al proyecto correcto.
5. No incluyas archivos sensibles como `.env`, credenciales, claves privadas o archivos temporales. Respeta `.gitignore`.
6. Revisa en los archivos que no se suban data sensible como URL, API KEYs, etc
7. Si no existen cambios pendientes, informa al usuario y termina.
8. Prepara únicamente los archivos pertinentes utilizando `git add`.
9. Genera un mensaje de commit descriptivo basado en los cambios, utilizando Conventional Commits:
   - feat: nuevas funcionalidades
   - fix: corrección de errores
   - refactor: reorganización del código
   - docs: documentación
   - test: pruebas
   - chore: mantenimiento
10. Ejecuta `git commit -m "<mensaje>"`.
11. Comprueba si la rama tiene upstream configurado. Si existe, ejecuta `git push`. Si no existe, informa al usuario y solicita autorización antes de configurar el upstream.
12. No uses `--force` ni omitas los hooks de Git. No modifiques otras ramas ni resuelvas conflictos automáticamente.
13. Si hay un error, informa cuál fue y no ejecutes acciones destructivas para resolverlo.
14. Al finalizar, muestra la rama, el identificador corto del commit, el mensaje generado y el resultado del push.

## Reglas

- Ejecuta esta operación únicamente cuando se invoque este comando.
- No inventes mensajes de commit genéricos.
- No incluyas archivos que no correspondan al cambio realizado.
- Respeta las ramas protegidas y las políticas de pull requests.
- Si detectas cambios potencialmente sensibles o ambiguos, solicita confirmación antes de incluirlos.
