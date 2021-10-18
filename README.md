# Mover

This is a silly racing game where you can try to beat your best lap time over
and over and over...

Use the arrow keys to control your little car.

## Get started

Install the dependencies...

```bash
cd mover
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run build
npm start
```

Navigate to [localhost:5000](http://localhost:5000). You should see the game
running.

To run in development mode, use...

```bash
npm run dev
```

## Custom tracks

Tracks are defined as an array of point coordinates, alternating between left
and right track boundaries.

To assist with track creation, there is an editing mode that can be switched on
in `App.svelte`. Use the generated data array to create a new track file in
`utils/tracks/`. See one of the existing tracks for an example. Track data is
loaded in `Mover.svelte`.

## 3D mode

There is also a 3D version of the game component in progress (`Mover3D.svelte`),
although it currently doesn't render track walls - making navigation much more
challenging!
