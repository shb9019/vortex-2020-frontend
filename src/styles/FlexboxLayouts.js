const FlexboxLayouts = {

  columns: {
    startAll: {
      display: 'flex',
      flexDirection: 'column',
      placeContent: 'flex-start',
      alignItems: 'flex-start',
    },
  },
  rows: {
    centerAll: {
      display: 'flex',
      flexDirection: 'row',
      placeContent: 'center',
      alignItems: 'center',
    },
    spaceBetweenCenter: {
      display: 'flex',
      flexDirection: 'row',
      placeContent: 'space-between',
      alignItems: 'center',
    },
    startAll: {
      display: 'flex',
      flexDirection: 'row',
      placeContent: 'flex-start',
      alignItems: 'flex-start',
    },
    startCenter: {
      display: 'flex',
      flexDirection: 'row',
      placeContent: 'flex-start',
      alignItems: 'center',
    }
  }

};

export default FlexboxLayouts;