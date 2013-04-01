/*
 * This file was AUTOMATICALLY generated from an ALPACA description.
 * EDIT AT YOUR OWN RISK!
 */


function in_nbhd_pred(pf, x, y, pred, nbhd) {
  var count = 0;
  for (var i = 0; i < nbhd.length; i++) {
    if (pred(pf.get(x+nbhd[i][0], y+nbhd[i][1]))) {
      count++;
    }
  }
  return count;
}

function in_nbhd_eq(pf, x, y, stateId, nbhd) {
  return in_nbhd_pred(pf, x, y, function(x) { return x === stateId; }, nbhd);
}

function evolve_playfield(pf, new_pf) {
  pf.map(new_pf, evalState, -1, -1, 1, 1);
}
function loadMapper(c) {
  if (c === ' ') return 'Air';
  if (c === '#') return 'Earth';
  if (c === '%') return 'Fire';
  if (c === '&') return 'Magma';
  if (c === '*') return 'Spark';
  if (c === '-') return 'Tail';
  if (c === '.') return 'OnePebble';
  if (c === ':') return 'TwoPebble';
  if (c === '=') return 'Wire';
  if (c === '<') return 'ConveyorLeft';
  if (c === '?') return 'Randomizer';
  if (c === '>') return 'ConveyorRight';
  if (c === '@') return 'Smoke';
  if (c === 'D') return 'DuctTape';
  if (c === 'O') return 'UnravelTape';
  if (c === 'T') return 'Torch';
  if (c === 'Z') return 'BigZappy';
  if (c === 'f') return 'Fish';
  if (c === 'l') return 'Twig';
  if (c === 'o') return 'Bubble';
  if (c === 's') return 'Steam';
  if (c === 'z') return 'Zappy';
  if (c === '~') return 'Water';
};
function dumpMapper(s) {
  if (s === 'Air') return ' ';
  if (s === 'Earth') return '#';
  if (s === 'Fire') return '%';
  if (s === 'Magma') return '&';
  if (s === 'Spark') return '*';
  if (s === 'Tail') return '-';
  if (s === 'OnePebble') return '.';
  if (s === 'TwoPebble') return ':';
  if (s === 'Wire') return '=';
  if (s === 'ConveyorLeft') return '<';
  if (s === 'Randomizer') return '?';
  if (s === 'ConveyorRight') return '>';
  if (s === 'Smoke') return '@';
  if (s === 'DuctTape') return 'D';
  if (s === 'UnravelTape') return 'O';
  if (s === 'Torch') return 'T';
  if (s === 'BigZappy') return 'Z';
  if (s === 'Fish') return 'f';
  if (s === 'Twig') return 'l';
  if (s === 'Bubble') return 'o';
  if (s === 'Steam') return 's';
  if (s === 'Zappy') return 'z';
  if (s === 'Water') return '~';
};
function is_Passthru(st) {
  return (st === 'Fire') || (st === 'Zappy') || (st === 'BigZappy') || (st === 'Air') || (st === 'Water') || (st === 'Smoke') || (st === 'Bubble') || (st === 'Steam') || 0;
}

function is_Flammable(st) {
  return (st === 'UnravelTape') || (st === 'Twig') || (st === 'DuctTape') || 0;
}

function is_Support(st) {
  return (st === 'Wire') || (st === 'DuctTape') || (st === 'Randomizer') || (st === 'TwoPebble') || (st === 'Magma') || (st === 'Tail') || (st === 'Earth') || (st === 'Spark') || (st === 'Twig') || 0;
}

function is_Burner(st) {
  return (st === 'Fire') || (st === 'Zappy') || (st === 'Spark') || (st === 'Magma') || (st === 'BigZappy') || 0;
}

function is_Steamy(st) {
  return (st === 'Bubble') || (st === 'Steam') || (st === 'Smoke') || 0;
}

function is_Fallable(st) {
  return (st === 'UnravelTape') || (st === 'OnePebble') || (st === 'TwoPebble') || (st === 'Twig') || 0;
}

function evalClass_Fallable(pf, x, y) {
var id;
if (((!(is_Support(pf.get(x+0,y+1)))&&(in_nbhd_eq(pf, x, y, 'Air', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 2))&&!((in_nbhd_eq(pf, x, y, 'DuctTape', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 1)))) {
  return 'Air';
}
if (((!(is_Support(pf.get(x+0,y+1)))&&(in_nbhd_eq(pf, x, y, 'Water', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 4))&&!((in_nbhd_eq(pf, x, y, 'DuctTape', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 1)))) {
  return 'Water';
}
if ((((pf.get(x+0,y+1)==='ConveyorLeft')&&!(is_Passthru(pf.get(x+-1,y+0))))||((pf.get(x+0,y+1)==='ConveyorRight')&&!(is_Passthru(pf.get(x+1,y+0)))))) {
  return pf.get(x+0,y+0);
}
return undefined;
}

function evalClass_Passthru(pf, x, y) {
var id;
if (is_Fallable(pf.get(x+0,y+-1))) {
  return pf.get(x+0,y+-1);
}
if ((is_Fallable(pf.get(x+1,y+0))&&(pf.get(x+1,y+1)==='ConveyorLeft'))) {
  return pf.get(x+1,y+0);
}
if ((is_Fallable(pf.get(x+-1,y+0))&&(pf.get(x+-1,y+1)==='ConveyorRight'))) {
  return pf.get(x+-1,y+0);
}
return undefined;
}

function evalClass_Flammable(pf, x, y) {
var id;
if ((in_nbhd_pred(pf, x, y, is_Burner, [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 1)) {
  return 'Fire';
}
return undefined;
}

function evalClass_Steamy(pf, x, y) {
var id;
if ((((((pf.get(x+-1,y+0)==='Water')||(pf.get(x+1,y+0)==='Water'))||(pf.get(x+-1,y+-1)==='Water'))||(pf.get(x+1,y+-1)==='Water'))||(pf.get(x+0,y+-1)==='Water'))) {
  return 'Water';
}
if (true) {
  return 'Air';
}
return undefined;
}

function evalClass_Burner(pf, x, y) {
var id;
return undefined;
}

function evalClass_Support(pf, x, y) {
var id;
return undefined;
}

function eval_Air(pf, x, y) {
var id;
if ((((((((pf.get(x+0,y+-1)==='Water')||(pf.get(x+-1,y+-1)==='Water'))||(pf.get(x+1,y+-1)==='Water'))||((pf.get(x+-1,y+0)==='Water')&&is_Support(pf.get(x+-1,y+1))))||(((pf.get(x+-1,y+0)==='Water')&&(pf.get(x+-1,y+1)==='Water'))&&(pf.get(x+0,y+1)==='Water')))||((pf.get(x+1,y+0)==='Water')&&is_Support(pf.get(x+1,y+1))))||(((pf.get(x+1,y+0)==='Water')&&(pf.get(x+1,y+1)==='Water'))&&(pf.get(x+0,y+1)==='Water')))) {
  return 'Water';
}
if ((((pf.get(x+0,y+1)==='Steam')||(pf.get(x+-1,y+1)==='Steam'))||(pf.get(x+1,y+1)==='Steam'))) {
  return 'Steam';
}
if ((((pf.get(x+0,y+1)==='Smoke')||(pf.get(x+-1,y+1)==='Smoke'))||(pf.get(x+1,y+1)==='Smoke'))) {
  return 'Smoke';
}
if ((in_nbhd_eq(pf, x, y, 'Spark', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 1)) {
  return 'Zappy';
}
id = evalClass_Passthru(pf, x, y);
if (id !== undefined) return id;
return 'Air';
}

function eval_Water(pf, x, y) {
var id;
if (((in_nbhd_eq(pf, x, y, 'Fire', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 1)||(in_nbhd_eq(pf, x, y, 'Magma', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 1))) {
  return 'Steam';
}
if ((((pf.get(x+0,y+1)==='Bubble')||(pf.get(x+0,y+1)==='Smoke'))||(pf.get(x+0,y+1)==='Steam'))) {
  return 'Bubble';
}
if (((in_nbhd_eq(pf, x, y, 'Fish', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 3)&&(in_nbhd_eq(pf, x, y, 'Water', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 5))) {
  return 'Fish';
}
id = evalClass_Passthru(pf, x, y);
if (id !== undefined) return id;
return 'Water';
}

function eval_Fire(pf, x, y) {
var id;
if ((((in_nbhd_eq(pf, x, y, 'Water', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 1)||!((in_nbhd_eq(pf, x, y, 'Air', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 1)))||((!((in_nbhd_eq(pf, x, y, 'Torch', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 1))&&!((in_nbhd_eq(pf, x, y, 'DuctTape', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 1)))&&!((in_nbhd_eq(pf, x, y, 'Twig', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 1))))) {
  return 'Smoke';
}
id = evalClass_Passthru(pf, x, y);
if (id !== undefined) return id;
id = evalClass_Burner(pf, x, y);
if (id !== undefined) return id;
return 'Fire';
}

function eval_Earth(pf, x, y) {
var id;
if ((in_nbhd_eq(pf, x, y, 'Fire', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 1)) {
  return 'Magma';
}
id = evalClass_Support(pf, x, y);
if (id !== undefined) return id;
return 'Earth';
}

function eval_Magma(pf, x, y) {
var id;
if ((!((in_nbhd_eq(pf, x, y, 'Fire', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 1))&&!((in_nbhd_eq(pf, x, y, 'Magma', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 2)))) {
  return 'Earth';
}
id = evalClass_Support(pf, x, y);
if (id !== undefined) return id;
id = evalClass_Burner(pf, x, y);
if (id !== undefined) return id;
return 'Magma';
}

function eval_Steam(pf, x, y) {
var id;
id = evalClass_Passthru(pf, x, y);
if (id !== undefined) return id;
id = evalClass_Steamy(pf, x, y);
if (id !== undefined) return id;
return 'Steam';
}

function eval_Smoke(pf, x, y) {
var id;
id = evalClass_Passthru(pf, x, y);
if (id !== undefined) return id;
id = evalClass_Steamy(pf, x, y);
if (id !== undefined) return id;
return 'Smoke';
}

function eval_Bubble(pf, x, y) {
var id;
id = evalClass_Passthru(pf, x, y);
if (id !== undefined) return id;
id = evalClass_Steamy(pf, x, y);
if (id !== undefined) return id;
return 'Bubble';
}

function eval_Fish(pf, x, y) {
var id;
if ((!((in_nbhd_eq(pf, x, y, 'Water', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 1))&&!((in_nbhd_eq(pf, x, y, 'Fish', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 8)))) {
  return 'Air';
}
if (((in_nbhd_eq(pf, x, y, 'Fish', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 4)||(in_nbhd_eq(pf, x, y, 'Water', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 7))) {
  return 'Water';
}
return 'Fish';
}

function eval_OnePebble(pf, x, y) {
var id;
if (((pf.get(x+0,y+-1)==='OnePebble')&&is_Support(pf.get(x+0,y+1)))) {
  return 'TwoPebble';
}
id = evalClass_Fallable(pf, x, y);
if (id !== undefined) return id;
return 'OnePebble';
}

function eval_TwoPebble(pf, x, y) {
var id;
id = evalClass_Fallable(pf, x, y);
if (id !== undefined) return id;
id = evalClass_Support(pf, x, y);
if (id !== undefined) return id;
return 'TwoPebble';
}

function eval_Spark(pf, x, y) {
var id;
if (true) {
  return 'Tail';
}
id = evalClass_Support(pf, x, y);
if (id !== undefined) return id;
id = evalClass_Burner(pf, x, y);
if (id !== undefined) return id;
return 'Spark';
}

function eval_Tail(pf, x, y) {
var id;
if (true) {
  return 'Wire';
}
id = evalClass_Support(pf, x, y);
if (id !== undefined) return id;
return 'Tail';
}

function eval_Wire(pf, x, y) {
var id;
if (((in_nbhd_eq(pf, x, y, 'Spark', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 1)&&!((in_nbhd_eq(pf, x, y, 'Spark', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 3)))) {
  return 'Spark';
}
id = evalClass_Support(pf, x, y);
if (id !== undefined) return id;
return 'Wire';
}

function eval_DuctTape(pf, x, y) {
var id;
if ((!((in_nbhd_eq(pf, x, y, 'DuctTape', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 2))||!(((in_nbhd_eq(pf, x, y, 'DuctTape', [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 1)&&(in_nbhd_pred(pf, x, y, is_Support, [[0,-1],[0,1],[-1,0],[-1,1],[-1,-1],[1,0],[1,1],[1,-1]]) >= 1))))) {
  return 'UnravelTape';
}
id = evalClass_Support(pf, x, y);
if (id !== undefined) return id;
id = evalClass_Flammable(pf, x, y);
if (id !== undefined) return id;
return 'DuctTape';
}

function eval_UnravelTape(pf, x, y) {
var id;
id = evalClass_Fallable(pf, x, y);
if (id !== undefined) return id;
id = evalClass_Flammable(pf, x, y);
if (id !== undefined) return id;
return 'UnravelTape';
}

function eval_Twig(pf, x, y) {
var id;
id = evalClass_Fallable(pf, x, y);
if (id !== undefined) return id;
id = evalClass_Support(pf, x, y);
if (id !== undefined) return id;
id = evalClass_Flammable(pf, x, y);
if (id !== undefined) return id;
return 'Twig';
}

function eval_Zappy(pf, x, y) {
var id;
if (true) {
  return 'BigZappy';
}
id = evalClass_Passthru(pf, x, y);
if (id !== undefined) return id;
id = evalClass_Burner(pf, x, y);
if (id !== undefined) return id;
return 'Zappy';
}

function eval_BigZappy(pf, x, y) {
var id;
if (true) {
  return 'Air';
}
id = evalClass_Passthru(pf, x, y);
if (id !== undefined) return id;
id = evalClass_Burner(pf, x, y);
if (id !== undefined) return id;
return 'BigZappy';
}

function eval_Randomizer(pf, x, y) {
var id;
id = evalClass_Support(pf, x, y);
if (id !== undefined) return id;
return 'Randomizer';
}

function eval_ConveyorLeft(pf, x, y) {
var id;
if (((pf.get(x+0,y+1)==='Randomizer')&&guess)) {
  return 'ConveyorRight';
}
return 'ConveyorLeft';
}

function eval_ConveyorRight(pf, x, y) {
var id;
if (((pf.get(x+0,y+1)==='Randomizer')&&guess)) {
  return 'ConveyorLeft';
}
return 'ConveyorRight';
}

function eval_Torch(pf, x, y) {
var id;
return 'Torch';
}

function evalState(pf, x, y) {
  var stateId = pf.get(x, y);
  if (stateId === 'Air') return eval_Air(pf, x, y);
  if (stateId === 'Water') return eval_Water(pf, x, y);
  if (stateId === 'Fire') return eval_Fire(pf, x, y);
  if (stateId === 'Earth') return eval_Earth(pf, x, y);
  if (stateId === 'Magma') return eval_Magma(pf, x, y);
  if (stateId === 'Steam') return eval_Steam(pf, x, y);
  if (stateId === 'Smoke') return eval_Smoke(pf, x, y);
  if (stateId === 'Bubble') return eval_Bubble(pf, x, y);
  if (stateId === 'Fish') return eval_Fish(pf, x, y);
  if (stateId === 'OnePebble') return eval_OnePebble(pf, x, y);
  if (stateId === 'TwoPebble') return eval_TwoPebble(pf, x, y);
  if (stateId === 'Spark') return eval_Spark(pf, x, y);
  if (stateId === 'Tail') return eval_Tail(pf, x, y);
  if (stateId === 'Wire') return eval_Wire(pf, x, y);
  if (stateId === 'DuctTape') return eval_DuctTape(pf, x, y);
  if (stateId === 'UnravelTape') return eval_UnravelTape(pf, x, y);
  if (stateId === 'Twig') return eval_Twig(pf, x, y);
  if (stateId === 'Zappy') return eval_Zappy(pf, x, y);
  if (stateId === 'BigZappy') return eval_BigZappy(pf, x, y);
  if (stateId === 'Randomizer') return eval_Randomizer(pf, x, y);
  if (stateId === 'ConveyorLeft') return eval_ConveyorLeft(pf, x, y);
  if (stateId === 'ConveyorRight') return eval_ConveyorRight(pf, x, y);
  if (stateId === 'Torch') return eval_Torch(pf, x, y);
}
