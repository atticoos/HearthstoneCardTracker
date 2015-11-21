describe('Logs: Power', function () {
  var chai = require('chai'),
      sinon = require('sinon'),
      sinonChai = require('sinon-chai'),
      Game = require('../../../src/game'),
      PowerHandler = require('../../../src/handlers/power'),
      powerHandler,
      expect,
      assert;

  before(function () {
    chai.use(sinonChai);
    expect = chai.expect;
    assert = chai.assert;
  });

  beforeEach(function () {
    powerHandler = new PowerHandler();
  });

  describe('event handlers', function () {
    it ('should detect ranked mode', function () {
      Game.setPlayingState = sinon.stub(Game, 'setPlayingState');
      powerHandler.handle('[Power] CREATE_GAME');
      expect(Game.setPlayingState).to.have.been.called;
      Game.setPlayingState.restore();
    });
    it ('should detect a card played', function () {
      Game.cardPlayed = sinon.stub(Game, 'cardPlayed');
      powerHandler.handle('2015-11-20 23:40:37.435: [Power] PowerTaskList.DebugPrintPower() -     FULL_ENTITY - Updating [name=Healing Totem id=70 zone=PLAY zonePos=1 cardId=NEW1_009 player=2] CardID=NEW1_009');
      expect(Game.cardPlayed).to.have.been.calledWith('NEW1_009');
      Game.cardPlayed.restore();
    });
  });
});
