var Handler = require('./handler');
var Game = require('../game');
var _ = require('lodash');

function AssetHandler () {
  var filters = [
    {
      pattern: /(rank_window)/i,
      // pattern: /(CachedAsset.UnloadAssetObject\(\)).*(unloading).*(name=rank_window_expand)/i,
      handler: this.onRankedMode
    }
  ]
  Handler.call(this, 'Asset', filters);
}

AssetHandler.prototype = _.create(Handler.prototype, {constructor: AssetHandler});

AssetHandler.prototype.onRankedMode = function () {
  Game.setRankedMode()
};

module.exports = AssetHandler;
