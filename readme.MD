### To install all dependencies

## npm install

### Run command

## node index.js

# create team

## POST Call

### http://localhost:9000/api/createTeam

### sample request:

```
{
	"name": "team1",
	"alignment": "",
	"members": []
}
```

### sample response

```
{
  "members": [],
  "_id": "5ea17c67704dbc456dac02df",
  "name": "team1",
  "alignment": "NEUTRAL",
  "__v": 0
}
```

# Remove team

## POST Call

### http://localhost:9000/api/removeTeam

### sample request:

```
{
	"id": "5ea17c67704dbc456dac02df"
}
```

### sample response

```
{
  "members": [],
  "_id": "5ea17c67704dbc456dac02df",
  "name": "team1",
  "alignment": "NEUTRAL",
  "__v": 0
}
```

# create super hero

## POST Call

### http://localhost:9000/api/createSuperHero

### sample request:

```
{
	"name": "spiderman",
	"alignment": "GOOD",
	"team": ""
}
```

### sample response

```
{
  "team": [
    ""
  ],
  "_id": "5ea17c7a704dbc456dac02e0",
  "name": "spiderman",
  "alignment": "GOOD",
  "__v": 0
}
```

# Add super hero to team

## POST Call

### http://localhost:9000/api/addSuperHeroToTeam

### sample request:

```
{
	"superHeroId": "5ea17c7a704dbc456dac02e0",
	"teamId": "5ea17c67704dbc456dac02df"
}
```

### sample response

```
{
  "members": [
    "5ea17bc00090b444f2a59e21"
  ],
  "_id": "5ea17bac0090b444f2a59e20",
  "name": "team1",
  "alignment": "GOOD",
  "__v": 1
}
```

# Remove super hero from team

## POST Call

### http://localhost:9000/api/removeSuperHero

### sample request:

```
{
	"superHeroId": "5ea17c7a704dbc456dac02e0",
	"teamId": "5ea17c67704dbc456dac02df"
}
```

### sample response

```
[
  {
    "members": [],
    "_id": "5ea17c67704dbc456dac02df",
    "name": "team1",
    "alignment": "GOOD",
    "__v": 1
  }
]
```

# Remove super hero

## POST Call

### http://localhost:9000/api/removeSuperHero

### sample request:

```
{
	"id": "5ea17c7a704dbc456dac02e0"
}
```

### sample response

```
[]
```

# Show all teams

## GET Call

### http://localhost:9000/api/showTeams

### sample response

```
[
  {
    "members": [],
    "_id": "5ea17c67704dbc456dac02df",
    "name": "team1",
    "alignment": "GOOD",
    "__v": 1
  }
]
```

# Show all super heros

## GET Call

### http://localhost:9000/api/showSuperHeros

### sample response

```
[
  {
    "team": [
      ""
    ],
    "_id": "5ea17d60704dbc456dac02e1",
    "name": "spiderman",
    "alignment": "GOOD",
    "__v": 0
  }
]
```

# Retrive team by ID

## GET Call

### http://localhost:9000/api/retriveTeam/5ea17c67704dbc456dac02df

### sample response

```
{
  "members": [],
  "_id": "5ea17c67704dbc456dac02df",
  "name": "team1",
  "alignment": "GOOD",
  "__v": 1
}
```

# Retrive super hero by ID

## GET Call

### http://localhost:9000/api/retriveSuperHeroById/5ea17e14704dbc456dac02e3

### sample response

```
{
  "team": [
    ""
  ],
  "_id": "5ea17e14704dbc456dac02e3",
  "name": "spiderman",
  "alignment": "GOOD",
  "__v": 0
}
```
