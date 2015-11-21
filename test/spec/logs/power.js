describe('Logs: Power', function () {
  var chai = require('chai'),
      sinon = require('sinon'),
      sinonChai = require('sinon-chai'),
      Game = require('../../../src/server/game'),
      PowerHandler = require('../../../src/server/handlers/power'),
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

      powerHandler.handle("2015-11-21 04:53:58.290: [Power] PowerTaskList.DebugPrintPower() - ACTION_START Entity=[name=Shadow Word: Pain id=53 zone=PLAY zonePos=0 cardId=CS2_234 player=2] BlockType=POWER Index=-1 Target=[name=Bloodfen Raptor id=47 zone=PLAY zonePos=1 cardId=CS2_172 player=2]");
      expect(Game.opponentCardDiscovered).to.have.been.calledWith('CS2_234');

      powerHandler.handle("2015-11-21 05:08:07.383: [Power] PowerTaskList.DebugPrintPower() - ACTION_START Entity=[name=Shadow Word: Pain id=52 zone=PLAY zonePos=0 cardId=CS2_234 player=2] BlockType=POWER Index=-1 Target=[name=Knife Juggler id=19 zone=PLAY zonePos=1 cardId=NEW1_019 player=1]");
      expect(Game.opponentCardDiscovered).to.have.been.calledWith('CS2_234');
    });

    // zone filter usually handles TRANSITIONs for enemy minion plays.
    // However, if there is a taunt, it counts as an `ACTION_START`, just like a spell
    it ('should not count self-taunts as additional cards', function () {
      powerHandler.handle('2015-11-21 05:16:59.456: [Power] PowerTaskList.DebugPrintPower() - ACTION_START Entity=[name=Frostwolf Grunt id=40 zone=PLAY zonePos=1 cardId=CS2_121 player=2] BlockType=POWER Index=-1 Target=0');
      expect(Game.opponentCardDiscovered).not.to.have.been.called;
    });
    afterEach(function () {
      Game.setPlayingState.restore();
      Game.opponentCardDiscovered.restore();
      Game.playerCardDiscovered.restore();
    })
  });
});
