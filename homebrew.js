function HomebrewTable() {

  const [homebrew, setHomebrew] = React.useState([]);
  const [search, setSearch] = React.useState('');

  const filtered = homebrew.filter(hb => {
    if (search) {
      let re = new RegExp(String.raw`.*${search}.*`, 'gi');
      return hb.filename.match(re) || hb.category.match(re) || (hb.type || '').match(re) || (hb.year || '').match(re) || (hb.event || '').match(re);
    } else {
      return true;
    }
  })

  React.useEffect(() => {
    fetch('metadata.json')
      .then(res => res.json())
      .then(json => setHomebrew(json))
  }, []);

  return React.createElement('div', {},
    React.createElement('span', {}, 'Filter: '),
    React.createElement('input', { type: 'text', value: search, onChange: (e) => setSearch(e.target.value) }),
    React.createElement('table', { border: 1},
      React.createElement('thead', {},
        React.createElement('tr', {},
          React.createElement('th', {}, 'Title'),
          React.createElement('th', {}, 'Category'),
          React.createElement('th', {}, 'Type'),
          React.createElement('th', {}, 'Year'),
          React.createElement('th', {}, 'Event')
        )
      ),
      React.createElement('tbody', {},
        ...filtered.map(hb => React.createElement('tr', {},
          React.createElement('td', {}, React.createElement('a', { href: `https://archive.org/download/${hb.path}` }, hb.filename)),
          React.createElement('td', {}, hb.category),
          React.createElement('td', {}, hb.type),
          React.createElement('td', {}, hb.year),
          React.createElement('td', {}, hb.event)
        ))
      )
    )
  );
}

const container = document.getElementById('homebrew-table');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(HomebrewTable));
