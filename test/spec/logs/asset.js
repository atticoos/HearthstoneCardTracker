describe('Logs: Asset', function () {
  var chai = require('chai'),
      sinon = require('sinon'),
      sinonChai = require('sinon-chai'),
      Game = require('../../../src/game'),
      AssetHandler = require('../../../src/log-reader/handlers/asset'),
      assetHandler,
      expect,
      assert;

  before(function () {
    chai.use(sinonChai);
    expect = chai.expect;
    assert = chai.assert;
  });

  beforeEach(function () {
    assetHandler = new AssetHandler();
  });

  describe('event handlers', function () {
    it ('should detect ranked mode', function () {
      Game.setRankedMode = sinon.stub(Game, 'setRankedMode');
      assetHandler.handle('[Asset] CachedAsset.UnloadAssetObject() - unloading name=rank_window_expand family=Sound persistent=True');
      expect(Game.setRankedMode).to.have.been.called;
      Game.setRankedMode.restore();
    });
  });
});
