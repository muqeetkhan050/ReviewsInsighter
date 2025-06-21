function Searchbar() {
  return (
    <div style={{ display: 'flex', gap: '10px', padding: '10px', justifyContent: 'center' }}>
      <input 
        type="text" 
        placeholder="Search your business" 
        style={{ padding: '8px', fontSize: '16px' }} 
      />
      <button 
        style={{ 
          padding: '8px 16px', 
          fontSize: '16px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer' 
        }}
      >
        Search
      </button>
    </div>
  );
}

export default Searchbar;
