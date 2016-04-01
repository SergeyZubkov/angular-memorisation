angular.module('services.dataService', ['LocalStorageModule'])

.config(function(localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('memorisation')
})

.factory('DataService', function(localStorageService, _) {
  var decks = localStorageService.get('decks');
  if(!decks) {
    decks = localStorageService.set('decks', [])
  }
  function saveToStorage(){
    localStorageService.set('decks',decks);
  };
  function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  };


  return {
    getDecks: function() {
      return decks
    },
    createDeck: function(title) {

      var deck = ({
        title: title, 
        id: guid(),
        cards: [],
        intervals: [[10, 20], [240, 480], [720, 1440], [10080, 20160], [20160, 40320]]
      });

      decks.push(deck);
      saveToStorage();
    },
    getDeck: function(id) {
      return _.findWhere(decks,{id: id})
    },
    createCard: function(deckId, cardData) {
      var defaults = {
        id: guid(),
        dateCreate: new Date().toString(),
        countRepeat: 0,
        toLearn: true,
        timeToRepeat: new Date().toString()
      };

      cardData = _.extend(defaults, cardData);

      _.findWhere(decks,{id: deckId})
        .cards.push(cardData);
      saveToStorage();
      cards = _.findWhere(decks, {id: deckId}).cards;
      console.log(cards[cards.length-1])
    },
    editCard: function (deckId, cardId, cardData) {
      angular.extend(this.getCard(deckId, cardId), cardData);
      saveToStorage();
    },
    getCards: function(deckId) {
      return _.findWhere(decks,{id: deckId})
          .cards
    },
    getRepeatCards: function(deckId) {
      var cards = _.findWhere(decks, {id: deckId}).cards;
      return _.filter(cards, function(card) {
        var repeatTime = new Date(card.timeToRepeat),
          diff = Math.floor((repeatTime.getTime() - new Date().getTime())/1000);
          console.log(diff <= 0)     
        return diff <= 0;
      });
    },
    getCard: function(deckId, cardId) {
      return _.findWhere(_.findWhere(decks,{id: deckId})
          .cards, {id: cardId})
    },
    getNearCardToRepeat: function(deckId) {

      var cards = this.getDeck(deckId).cards;
      if (!cards) return "";
        return _.sortBy(cards, function(card) {return card.timeToRepeat})[0];
      
    },
    deleteCard: function(deckId, cardId) {
      var deck = _.findWhere(decks, {id: deckId});
      var cards = deck.cards;
      cards = _.without(cards, _.findWhere(cards, {id: cardId}));
      deck.cards = cards;
      saveToStorage();
    },
    deleteDeck: function(deckId) {
      decks = _.without(decks, _.findWhere(decks, {id: deckId}));
      saveToStorage();
    },
    setTimeToRepeat: function(deckId, cardId, know) {
      var deck = _.findWhere(decks,{id: deckId});
      var card = _.findWhere(deck.cards, {id: cardId}),
        interval,
        modf;

        modf = know ? 1 : 0;
        console.log(deck)
        interval = this.getIntervals(deck)[card.countRepeat][modf];
        console.log(interval)

      card.timeToRepeat = new Date(new Date().getTime()  + interval).toString();
      card.countRepeat++
      console.log("card.timeToRepeat: " + card.timeToRepeat)
      saveToStorage();
    },
    getIntervals: function(deck) {
      //отдаются интервалы в миллисекундах
        console.log(deck)
        return deck.intervals.map(function(a) {return a.map(function(b) {return b*60000})})
    },
    setInterval: function(deck, level, nmb, value) {
        deck.intervals[level][nmb] = value;
        saveToStorage();
    }
  }

})