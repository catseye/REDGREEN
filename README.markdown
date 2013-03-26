REDGREEN
========

Cellular Automaton
------------------

REDGREEN is a successor to [RUBE][]. Unlike RUBE, REDGREEN is proper cellular
automaton (CA): the next state of each cell is determined only by its current
state and the states of its neighbours.

[RUBE]: http://catseye.tc/node/RUBE.html

Implementation
--------------

This implementation of REDGREEN is written in [ALPACA][] and compiled to a
Perl script using the reference ALPACA compiler. As a language for expressing
CA's, ALPACA is much, much clearer than C (the language in which RUBE was
implemented.)  In fact, the need for a clear description language for RUBE's
successor was one of the driving forces behind the development of ALPACA.
REDGREEN is an extremely complex automaton, making full use of ALPACA's
"class of states" feature.

[ALPACA]: http://catseye.tc/node/ALPACA.html

The REDGREEN Universe
---------------------

    Air                        Heavy things like water and pebbles fall through air. Light things like smoke and steam rise in air. Air is required for a fire to keep burning.
    Water            **`~`**   Heavy solid things like pebbles fall into water. Light things like steam or smoke make rising bubbles in water. Boils to steam when heated, but also puts out open fires. Fish can live a John Conway's Life in water.
    Fire             **`%`**   Heavy things like pebbles fall through fire; water puts it out. Requires flammable fuel and air to keep burning, otherwise goes up in smoke. Spreads to adjacent flammables like twigs and heats up adjacent non-flammables like rock.
    Earth            **`#`**   Stops things which would otherwise fall from falling. Can be heated up to magma by adjacent fire.
    Magma            **`&`**   Heated-up earth, will cool down to earth if no adjacent fire or magma is present. Can boil water.
    Steam            **`s`**   From boiling water, rises in air.
    Smoke            **`@`**   From fire, rises in air.
    Bubble           **`o`**   From air or steam or smoke, rises in water.
    Fish             **`f`**   Lives a [John Conway's Life][] in water.
    Pebble           **`.`**   Falls through air.
    Two Pebbles      **`:`**   Two pebbles stacked together, also falls through air.
    Spark            **`*`**   An electrical phenomenon living a [WireWorld][] existence.
    Tail             **`-`**   The trail of a spark.
    Wire             **`=`**   Conducts electricity (sparks).
    Zappy            **`z`**   Shot off by sparks. Can set flammables on fire.
    Big Zappy        **`Z`**   Also shot off by sparks. Can also set flammables on fire.
    Duct Tape        **`D`**   Flammable. Things can stick to it. It can unravel.
    "Oh No" Tape     **`O`**   Flammable. Duct tape that's unravelling.
    Twig             **`l`**   Flammable.
    Conveyor Left    **`<`**   Moves twigs, pebbles etc. on top of it to the left.
    Conveyor Right   **`>`**   Moves twigs, pebbles etc. on top of it to the right.
    Randomizer       **`?`**   Randomly flips the direction of the Conveyor adjacent above it.
    Torch            **`T`**   Provides endless fuel for a fire.


[John Conway's Life]: https://github.com/catseye/ALPACA/tree/master/eg/life
[WireWorld]: https://github.com/catseye/ALPACA/tree/master/eg/wireworld
