# Jocs per computador: Mario Bros game

Mario Bros videogame for Computer Games project in JS.

- animation when desaccelerate
- ~~cambiar icono del status coin *XINLEI*~~

nivel 2.0:
- avanzar al nivel 2.0 desde una tuberia

### 6 PUNTOS DEL PROYECTO
+ ~~Crear 2 enemigos(goomba y koopa troopas). Koopa troopas deja una cascara cuando muere, y sus animaciones~~
+ ~~Saltar con tecla espacio y correr manteniendo tecla shift~~
+ ~~Poder destruir bloques en modo Super Mario *XINLEI*~~
+ ~~Monedas o power-ups en los bloques interrogante~~
- Power-up: super seta(Super Mario) y estrella invencible(Star Mario, tiempo limitado) *XINLEI*
- ~~Recuento de puntuacion por las monedas, enemigos, etc  *PACO*~~
- ~~Superar el nivel en tiempo limitado. Alcanzar el flag al final del mapa. La altura alcanzada del flag determina el bonus en la puntuacion. *PACO*~~
- ~~Caer al vacio o al agua, muere Mario *PACO*~~

**Hacks:**
- M para transformar en Super Mario y G para Star Mario  *XINLEI*
- ~~Teclas 1 y 2 para saltar a pantallas concretas. *PACO*~~

### 4 PUNTOS DEL PROYECTO
- ~~4 pantallas basicas: menú principal, jugar, instrucciones, creditos. *PACO* ~~
El menú ha de presentar als fantasmes, així com mostrar les puntuacions com es fa al Pacman original.
- Sonido: música de fondo i efectos especiales.  *XINLEI*
+ ~~GUI: mostrant el nivell, vides, puntuació, i high-score(pantalla de transicion).~~
- Memòria(GDD)


## POLISH SUPER MARIO BROS NES
- Pausa antes de empezar.
+ ~~Animación de los bloques con un interrogante.~~
- Animación de los bloques cuando son impactados y/o destruidos.
- Animaciones de Mario: llorar, saltar, morir.
- Animaciones de los enemigos, tanto para matar como para morir.
- Sprites que aparecen sobre Mario indicando la puntuación conseguida.
- Efecto para la transformación de Mario entre sus cuatro estados (Mario, Super Mario y Star Mario).
- El movimiento de Mario se acelera. Entonces dirás que Mario no va siempre a la misma velocidad. Gana velocitat de forma progresiva
cuando empiece a moverse y la pierda cuando el jugador quiera parar.
- ~~Animación en llegar a la bandera para finalizar el nivel.~~
- Bonificación a la puntuación por tiempo restante al final del nivel.

-----------------------------------
XINLEI:

*Layer[2]: query block(2), ladrillo(3), coins(36)... static sprites*

- powerups moving up from queryblock
- supermario does not die, remove animation of dying

starmario => from minimario or super mario
supermario => only from minimario

minimario => mushroom or star
supermario => star

- ??:
not downkey on supermario when downkey is released
- collision top to blocks should be more narrow, mario cant pass through jumping to a 1 space block(design bug)
when star mode mario kills all enemys by touch


  Paco
- Tiempo
- numero instrucciones
- sonido
- goomba
- nivel 2 bricks
- salta muchas veces cuando mata
  
