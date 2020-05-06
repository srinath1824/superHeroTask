# Back End Engineering Challenge -- SuperHero Teams API

Libera SuperHeroes is looking for someone to design and build a RESTful API for data for tracking superheroes and their teams. Some sample data structures are included for the superhero and team.

## Requirements:

- Demonstrate use of REST conventions, Include routes to:  
	- add a superhero
	- add a team
	- add a superhero to the team (superheros may be members of more than one team) 
  - remove a group
  - remove a superhero from a team
  - remove a superhero
  - retrieve a superhero by Id (including the teams they are part of)
  - retrieve a team by Id (including the superheros on the team)

- Do not include a database (for this iteration store all your data 'in-memory')
- Create tests (either physically or suggest in your README) for any common issues
- Handle errors 

- develop your solution as a complete package that will be run by the Libera team
  - Include a readme and/or instructions for installing and running
  - Induced instructions on how to run your included test or what those tests are
  - Document any assumptions you made and issues you encountered

## Bonuses:

- Based on the content of a group, report the mean alignment of the group (e.g. if there are 10 GOOD and 5 BAD characters in the group, they mean alignment would be GOOD) -- report NEUTRAL when you cant determine.  

- Rather than just display the teamId/superHeroId in the team and members list - display an array of the record (superhero or team) - avoiding the recursive information

## Data structures:

### superhero
```
{ 
  id: UUID
  name: string
  alignment: GOOD | BAD | NEUTRAL
  team: [ teamId, ... ]
}
```
for example:
```
{
  id: 616fbae4-7d94-11ea-bc55-0242ac130003,
  name: Superman,
  alignment: GOOD,
  team: [ 30ee4aac-7d94-11ea-bc55-0242ac130003 , 38aa68a2-7d94-11ea-bc55-0242ac130003 ]
}
```

### team
```
{
  id:  UUID
  name: string
  alignment:  GOOD | BAD | NEUTRAL  // this should be the team's mean alignment (if attempted)
  members: [ superheroId, ... ]
}
```
for example:
```
{
  id: 30ee4aac-7d94-11ea-bc55-0242ac130003
  name: JusticeLeage,
  meanAlignment: GOOD,  
  superheroes: [ 59cf8efe-7d94-11ea-bc55-0242ac130003,  616fbae4-7d94-11ea-bc55-0242ac13000 ]
}

```
