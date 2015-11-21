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
    beforeEach(function () {
      Game.setPlayingState = sinon.stub(Game, 'setPlayingState');
      Game.opponentCardDiscovered = sinon.stub(Game, 'opponentCardDiscovered');
      Game.playerCardDiscovered = sinon.stub(Game, 'playerCardDiscovered');
    });
    it ('should detect ranked mode', function () {
      powerHandler.handle('[Power] CREATE_GAME');
      expect(Game.setPlayingState).to.have.been.called;
    });
    it ('should detect a card action by the opponent', function () {
      powerHandler.handle('2015-11-21 01:47:14.003: [Power] PowerTaskList.DebugPrintPower() - ACTION_START Entity=[name=Holy Smite id=57 zone=PLAY zonePos=0 cardId=CS1_130 player=2] BlockType=POWER Index=-1 Target=[name=Knife Juggler id=13 zone=PLAY zonePos=1 cardId=NEW1_019 player=1]');
      expect(Game.opponentCardDiscovered).to.have.been.calledWith('CS1_130');
    });
    afterEach(function () {
      Game.setPlayingState.restore();
      Game.opponentCardDiscovered.restore();
      Game.playerCardDiscovered.restore();
    })
  });
});
