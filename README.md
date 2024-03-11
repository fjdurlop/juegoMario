# Jocs per computador: Mario  Bros game

Mario Bros videogame for Computer Games project in JS.

- Fisica, acceleracion, friccion
- animation when desaccelerate
- cambiar icono moneda de status
- sprite? de las puntuaciones
-? banderita en ganar ?

nivel 2.0:
- avanzar al nivel 2.0 desde una tuberia

(6 PUNTOS DEL PROYECTO)
- Crear 2 enemigos(goomba y koopa troopas). Koopa troopas deja una cascara cuando muere, y sus animaciones
- Saltar con tecla espacio y correr manteniendo tecla shift
- Poder destruir bloques en modo Super Mario
- Monedas o power-ups en los bloques interrogante  
- Power-up: super seta(Super Mario) y estrella invencible(Star Mario, tiempo limitado)
- Recuento de puntuacion por las monedas, enemigos, etc
- Superar el nivel en tiempo limitado. Alcanzar el flag al final del mapa. La altura alcanzada del flag determina el bonus en la puntuacion.
- Caer al vacio o al agua, muere Mario

Hacks:
- M para transformar en Super Mario y G para Star Mario
- Teclas 1 y 2 para saltar a pantallas concretas.

(4 PUNTOS DEL PROYECTO)
- 4 pantallas basicas: menú principal, jugar, instrucciones, creditos. 
- El menú ha de presentar als fantasmes, així com mostrar les puntuacions com es fa al Pacman original.
- Sonido: música de fondo i efectos especiales.
- GUI: mostrant el nivell, vides, puntuació, i high-score(pantalla de transicion)
- Memòria(GDD)

xinlei:
*Layer[2]: query block, ladrillo, static sprites

- Monedas o power-ups en los bloques interrogante
  +sprite del moneda y power ups
  -bobbing del bloque
  -destruccion bloque
  -salto de moneda
  -star bounding, and mario flash
  -interaccion con ello
- refactor folders, .js and imgs
- completar mapa 1.0, no tener tantos bloques animativos, castillo con el flag

- ??:
  - en cada frame se ejecuta el codigo entero, significa que va creando instancias nuevas en cada frame?
  - this.startY no declared
  
