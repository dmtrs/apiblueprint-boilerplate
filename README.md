Apiblueprint boilerplate
========================

A grunt setup for working with APIblueprint format.

Makes the workflow much easier, by concatonating multiple blueprints in the
source folder to a single file - dist/built.apib and also publishing.

## Setup

```
$ cd apiblueprint-boilerplate
$ make install
``` 

This will install the [Apiary Client](http://client.apiary.io/), Grunt as global and  related npm node modules.

## Configure

```
$ cp config/default.yaml.js config/dev.yaml
```

Edit the above file to configure your installation properly an example is illustrated here:

```yaml
apiary:
  name: analytics
  key: 564cc7872bf8a
  path: dist/apiary.apib
```

## How we work

To start working we startup fire up Grunt by issuing:
```
$ grunt
```

By `default` Grunt will start a server at `http://localhost:8080/` and continue by watching files in `source/` for changes.

Our Apiblueprint document exist in `source/` where we already have  `source/00.intro.apib` file.

A change to `source/00.intro.apib` will result in concating the documents under `source/` in a destination file `dist/apiary.apib` (see our configuration).

This way we can structure our `.apib` files under instead of a uniq file.

## Publish to Apiary

If you have an Apiary account you want to publish the resulted document add your apiary api key to the `config/dev.yaml` and issue:

```
$ grunt publish
```
