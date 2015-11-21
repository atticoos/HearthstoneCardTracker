describe('Logs: Bob', function () {
  var chai = require('chai'),
      sinon = require('sinon'),
      sinonChai = require('sinon-chai'),
      Game = require('../../../src/game'),
      BobHandler = require('../../../src/log-reader/handlers/bob'),
      bobHandler,
      expect,
      assert;

  before(function () {
    chai.use(sinonChai);
    expect = chai.expect;
    assert = chai.assert;
  });

  beforeEach(function () {
    bobHandler = new BobHandler();
  });

  describe('event handlers', function () {
    it ('should detect the collection screen', function () {
      Game.onCollection = sinon.stub(Game, 'onCollection');
      bobHandler.handle('[Bob] ---RegisterScreenCollectionManager--- foo bar');
      expect(Game.onCollection).to.have.been.called;
      Game.onCollection.restore();
    });
    it ('should detect the friend challenge screen', function () {
      Game.onFriendChallenge = sinon.stub(Game, 'onFriendChallenge');
      bobHandler.handle('[Bob] ---RegisterFriendChallenge--- foo bar');
      expect(Game.onFriendChallenge).to.have.been.called;
      Game.onFriendChallenge.restore();
    });
    it ('should detect the practice screen', function () {
      Game.onPracticeScreen = sinon.stub(Game, 'onPracticeScreen');
      bobHandler.handle('[Bob] ---RegisterScreenPractice--- foo bar');
      expect(Game.onPracticeScreen).to.have.been.called;
      Game.onPracticeScreen.restore();
    });
    it ('should detect the practice screen', function () {
      Game.onCasualScreen = sinon.stub(Game, 'onCasualScreen');
      bobHandler.handle('[Bob] ---RegisterScreenTourneys--- foo bar');
      expect(Game.onCasualScreen).to.have.been.called;
      Game.onCasualScreen.restore();
    });
    it ('should detect the friendly game mode screen', function () {
      Game.onFriendlyScreen = sinon.stub(Game, 'onFriendlyScreen');
      bobHandler.handle('[Bob] ---RegisterScreenFriendly--- foo bar');
      expect(Game.onFriendlyScreen).to.have.been.called;
      Game.onFriendlyScreen.restore();
    });
    it ('should detect the arena screen', function () {
      Game.onArenaScreen = sinon.stub(Game, 'onArenaScreen');
      bobHandler.handle('[Bob] ---RegisterScreenForge--- foo bar');
      expect(Game.onArenaScreen).to.have.been.called;
      Game.onArenaScreen.restore();
    });
    it ('should detect the startup screen', function () {
      Game.onGameLoaded = sinon.stub(Game, 'onGameLoaded');
      bobHandler.handle('[Bob] ---RegisterProfileNotices--- foo bar');
      expect(Game.onGameLoaded).to.have.been.called;
      Game.onGameLoaded.restore();
    });
  });
});
