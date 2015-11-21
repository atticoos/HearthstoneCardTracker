describe('Logs: Power', function () {
  var chai = require('chai'),
      sinon = require('sinon'),
      sinonChai = require('sinon-chai'),
      Game = require('../../../src/game'),
      ZoneHandler = require('../../../src/handlers/zone'),
      zoneHandler,
      expect,
      assert;

  before(function () {
    chai.use(sinonChai);
    expect = chai.expect;
    assert = chai.assert;
  });

  beforeEach(function () {
    zoneHandler = new ZoneHandler();
  });

  describe('event handlers', function () {
    beforeEach(function () {
      Game.opponentCardDiscovered = sinon.stub(Game, 'opponentCardDiscovered');
      Game.playerCardDiscovered = sinon.stub(Game, 'playerCardDiscovered');
    });
    it ('should detect a card added to the hand', function () {
      zoneHandler.handle("2015-11-21 00:55:27.503: [Zone] ZoneChangeList.ProcessChanges() - TRANSITIONING card [name=Power Overwhelming id=56 zone=HAND zonePos=0 cardId=EX1_316 player=2] to FRIENDLY HAND");
      expect(Game.playerCardDiscovered).to.have.been.calledWith('EX1_316');

      zoneHandler.handle('2015-11-21 01:19:00.112: [Zone] ZoneChangeList.ProcessChanges() - TRANSITIONING card [name=Abusive Sergeant id=27 zone=HAND zonePos=0 cardId=CS2_188 player=1] to FRIENDLY HAND');
      expect(Game.playerCardDiscovered).to.have.been.calledWith('CS2_188');

      zoneHandler.handle('2015-11-21 01:37:59.269: [Zone] ZoneChangeList.ProcessChanges() - TRANSITIONING card [name=Jeweled Scarab id=25 zone=HAND zonePos=0 cardId=LOE_029 player=1] to FRIENDLY HAND');
      expect(Game.playerCardDiscovered).to.have.been.calledWith('LOE_029');

      zoneHandler.handle('2015-11-21 02:08:50.031: [Zone] ZoneChangeList.ProcessChanges() - TRANSITIONING card [name=Haunted Creeper id=85 zone=HAND zonePos=0 cardId=FP1_002 player=2] to FRIENDLY HAND');
      expect(Game.playerCardDiscovered).to.have.been.calledWith('FP1_002');
    });
    it ('should detect when an opponent plays a card', function () {
      zoneHandler.handle('2015-11-21 01:40:11.198: [Zone] ZoneChangeList.ProcessChanges() - TRANSITIONING card [name=Silverback Patriarch id=61 zone=PLAY zonePos=5 cardId=CS2_127 player=2] to OPPOSING PLAY');
      expect(Game.opponentCardDiscovered).to.have.been.calledWith('CS2_127');

      zoneHandler.handle('2015-11-21 01:59:34.165: [Zone] ZoneChangeList.ProcessChanges() - TRANSITIONING card [name=Chillwind Yeti id=45 zone=PLAY zonePos=5 cardId=CS2_182 player=2] to OPPOSING PLAY');
      expect(Game.opponentCardDiscovered).to.have.been.calledWith('CS2_182')
    });
    it ('should ignore opponent hero powers', function () {
      zoneHandler.handle('2015-11-21 02:11:10.322: [Zone] ZoneChangeList.ProcessChanges() - TRANSITIONING card [name=Lesser Heal id=67 zone=PLAY zonePos=0 cardId=CS1h_001 player=2] to OPPOSING PLAY (Hero Power)');
      expect(Game.opponentCardDiscovered).not.to.have.been.called;
    });
    afterEach(function () {
      Game.playerCardDiscovered.restore();
      Game.opponentCardDiscovered.restore();
    });
  });
});
