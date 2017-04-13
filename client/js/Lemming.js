//A Lemming will contain:
// sprites -- access the sprite hash from Game Model
// state: umbrella, climbing, walking, blocking, falling(count how long, set some thresh-hold then splat on impact)
// bomb: start countdown
//
// Lemming.die(death_type) show the sprite sequence, remove from Lemmings array
//   isAlive boolean flag
//   death_types = [ 'drown', 'splat', 'explode', 'trap' ]
//
// Lemming.changeType(type)
//   activate new sprite
//
// need Lemming generator that returns a Lemming object
//  Lemming.update(elapsedTime) //update position, process collisions, death events, mouse hover events
//  ??isHover boolean flag??
//  Lemming.render() //render the active sprite at the location of the lemming
