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

  const formatSize = (size) => {
    if (Math.abs(size) < 1024) {
      return size + ' B';
    }
    const units = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    do {
      size /= 1024;
      ++u;
    } while (Math.round(Math.abs(size)) >= 1024 && u < units.length - 1);
    return size.toFixed(0) + ' ' + units[u];
  }

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
          React.createElement('th', {}, 'Size'),
          React.createElement('th', {}, 'Category'),
          React.createElement('th', {}, 'Type'),
          React.createElement('th', {}, 'Year'),
          React.createElement('th', {}, 'Event')
        )
      ),
      React.createElement('tbody', {},
        ...filtered.map(hb => React.createElement('tr', {},
          React.createElement('td', {}, React.createElement('a', { href: `https://archive.org/download/${hb.path}` }, hb.filename)),
          React.createElement('td', {}, formatSize(hb.filesize)),
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
