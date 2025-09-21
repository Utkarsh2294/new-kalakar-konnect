import React, { useState } from 'react';

const KalakaarKonnectApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Artisan form state
  const [artisanForm, setArtisanForm] = useState({
    shopName: '',
    address: '',
    pincode: '',
    city: '',
    country: '',
    primaryCraft: '',
    experience: '',
    yourStory: '',
    termsAgreement: false
  });
  
  const [products, setProducts] = useState([{
    id: 1,
    name: '',
    price: '',
    images: []
  }]);

  // Navigation handler
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Form handlers
  const handleArtisanFormChange = (field, value) => {
    setArtisanForm(prev => ({ ...prev, [field]: value }));
  };

  const handleProductChange = (productId, field, value) => {
    setProducts(prev => prev.map(product => 
      product.id === productId ? { ...product, [field]: value } : product
    ));
  };

  const addProduct = () => {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    setProducts(prev => [...prev, { id: newId, name: '', price: '', images: [] }]);
  };

  const removeProduct = (productId) => {
    if (products.length > 1) {
      setProducts(prev => prev.filter(product => product.id !== productId));
    } else {
      alert('You must have at least one product.');
    }
  };

  const handleImageUpload = (productId, files) => {
    if (files.length > 4) {
      alert('You can upload maximum 4 images per product');
      return;
    }
    handleProductChange(productId, 'images', Array.from(files));
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    alert(`Searching for artisans with: ${searchQuery}`);
  };

  const handleArtisanSubmit = () => {
    if (!artisanForm.termsAgreement) {
      alert('Please agree to the Terms and Conditions');
      return;
    }
    console.log('Artisan form submitted:', { artisanForm, products });
    alert('Your AI-Powered Shop has been created successfully!');
  };

  // Component styles
  const getStyles = () => {
    const isHome = currentPage === 'home';
    const isAbout = currentPage === 'about';
    const isSearch = currentPage === 'search';
    const isArtisan = currentPage === 'artisan';

    return {
      body: {
        margin: 0,
        fontFamily: '"Poppins", sans-serif',
        backgroundColor: isHome ? '#fffdf8' : 
                        isAbout ? '#1E2A32' : 
                        isSearch ? '#121212' : '#1e1e1e',
        color: isHome ? '#333' : 
               isAbout ? '#f5f5f5' : 
               isSearch ? '#f0f0f0' : '#d2b48c',
        minHeight: '100vh'
      },

      header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isHome ? '20px 60px' : '1rem 2rem',
        background: isHome ? 'white' : '#121a20',
        boxShadow: isHome ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
        borderBottom: !isHome ? '2px solid #2e3c46' : 'none'
      },

      headerTitle: {
        fontSize: isHome ? '22px' : '1.8rem',
        fontWeight: '700',
        color: isHome ? '#a64b00' : '#ffcc66'
      },

      nav: {
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
      },

      navLink: {
        textDecoration: 'none',
        color: isHome ? '#444' : '#f5f5f5',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'color 0.3s ease'
      },

      btn: {
        padding: '10px 18px',
        borderRadius: isHome ? '25px' : '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: '600',
        transition: '0.3s',
        margin: '0 5px'
      },

      btnPrimary: {
        background: isHome ? '#a64b00' : 
                    isSearch ? '#f5ba42' : '#ffcc66',
        color: isHome ? 'white' : 
               isSearch ? '#121212' : '#1E2A32'
      },

      btnOutline: {
        background: isHome ? 'white' : 'transparent',
        border: isHome ? '2px solid #a64b00' : '2px solid #ffcc66',
        color: isHome ? '#a64b00' : '#ffcc66'
      }
    };
  };

  const styles = getStyles();

  // Home Page Component
  const HomePage = () => (
    <div>
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '90px 20px',
        background: 'linear-gradient(to right, #fffaf3, #fff)'
      }}>
        <h2 style={{
          fontSize: '34px',
          marginBottom: '10px',
          color: '#5a2d00',
          fontWeight: '600',
          maxWidth: '750px',
          lineHeight: '1.4'
        }}>
          Hi, we are <span style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: '38px',
            fontWeight: '600',
            color: '#a64b00'
          }}>Kalakaar Konnect</span> — helping artisans build dreams, one creation at a time.
        </h2>
        <p style={{
          fontSize: '19px',
          margin: '20px 0 40px',
          color: '#555',
          fontWeight: '500'
        }}>Are you an Artisan or a Patron?</p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button 
            style={{ ...styles.btn, ...styles.btnPrimary, minWidth: '130px', fontSize: '16px' }}
            onClick={() => navigateTo('artisan')}
          >
            Artisan
          </button>
          <button 
            style={{ ...styles.btn, ...styles.btnOutline, minWidth: '130px', fontSize: '16px' }}
            onClick={() => navigateTo('search')}
          >
            Patron
          </button>
        </div>
      </section>

      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px',
        padding: '60px',
        background: '#fafafa'
      }}>
        {[
          { title: 'Discover Artisans', desc: 'Find talented creators bringing culture, craft, and creativity into the spotlight.' },
          { title: 'Support & Connect', desc: 'Patrons can connect with artisans and support their work through collaborations.' },
          { title: 'Grow Together', desc: 'We provide a platform where creativity meets opportunity and growth.' }
        ].map((service, index) => (
          <div key={index} style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
            textAlign: 'center',
            transition: '0.3s'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#a64b00' }}>{service.title}</h3>
            <p style={{ fontSize: '15px', color: '#555' }}>{service.desc}</p>
          </div>
        ))}
      </section>

      <footer style={{
        textAlign: 'center',
        padding: '20px',
        background: '#fff7f0',
        fontSize: '14px',
        color: '#666'
      }}>
        © 2025 Kalakaar Konnect. All rights reserved.
      </footer>
    </div>
  );

  // About Page Component
  const AboutPage = () => (
    <div>
      <main style={{ padding: '2rem', maxWidth: '900px', margin: 'auto' }}>
        <section>
          <h2 style={{
            fontSize: '2rem',
            color: '#ffcc66',
            marginBottom: '1rem',
            borderBottom: '2px solid #ffcc66',
            display: 'inline-block'
          }}>About Us</h2>
          <p style={{ marginBottom: '2rem' }}>
            <strong>Hi, we are Kalakaar Konnect — helping artisans build dreams, one creation at a time.</strong>
          </p>
          
          <div>
            <h3 style={{ color: '#ffd98a', marginTop: '1.5rem', fontSize: '1.3rem' }}>Our Mission</h3>
            <p style={{ marginTop: '0.5rem', color: '#e0e0e0' }}>
              At Kalakaar Konnect, we believe in the power of traditional craftsmanship and the stories behind every handmade creation. We serve as a bridge between talented artisans and customers who appreciate authentic, handcrafted products.
            </p>
            
            <h3 style={{ color: '#ffd98a', marginTop: '1.5rem', fontSize: '1.3rem' }}>What We Do</h3>
            <p style={{ marginTop: '0.5rem', color: '#e0e0e0' }}>
              We connect skilled artisans with opportunities to showcase their work, build sustainable businesses, and preserve traditional art forms for future generations. Every purchase supports an artisan's livelihood and keeps ancient crafts alive.
            </p>
            
            <h3 style={{ color: '#ffd98a', marginTop: '1.5rem', fontSize: '1.3rem' }}>Our Vision</h3>
            <p style={{ marginTop: '0.5rem', color: '#e0e0e0' }}>
              To create a thriving ecosystem where artisans can flourish, traditional crafts can survive and evolve, and customers can discover unique, meaningful products that tell a story.
            </p>
          </div>
        </section>
      </main>

      <footer style={{
        background: '#121a20',
        textAlign: 'center',
        padding: '1rem',
        marginTop: '2rem',
        borderTop: '2px solid #2e3c46',
        color: '#bbb'
      }}>
        <p>&copy; 2025 Kalakaar Konnect. All rights reserved.</p>
      </footer>
    </div>
  );

  // Search Page Component
  const SearchPage = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '40px',
        background: '#1e1e1e',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
        width: '90%',
        maxWidth: '500px'
      }}>
        <h3 style={{
          marginBottom: '20px',
          fontSize: '1.4rem',
          fontWeight: '500',
          color: '#f5ba42'
        }}>We will connect you with the best artisans nearby.</h3>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What are you looking for..."
            style={{
              flex: 1,
              padding: '12px 15px',
              border: 'none',
              borderRadius: '8px',
              background: '#2a2a2a',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '12px 20px',
              border: 'none',
              borderRadius: '8px',
              background: '#f5ba42',
              color: '#121212',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );

  // Artisan Details Page Component
  const ArtisanDetailsPage = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div style={{
        backgroundColor: '#2b2b2b',
        padding: '30px',
        borderRadius: '10px',
        width: '90%',
        maxWidth: '800px'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.8rem' }}>
          Build Your Digital Shopfront
        </h1>
        
        <div>
          {/* Basic Information */}
          <label style={{ display: 'block', marginTop: '15px', fontWeight: 'bold' }}>Shop Name</label>
          <input
            type="text"
            value={artisanForm.shopName}
            onChange={(e) => handleArtisanFormChange('shopName', e.target.value)}
            placeholder="Artisan Alley"
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#3a3a3a',
              color: '#d2b48c'
            }}
          />

          <label style={{ display: 'block', marginTop: '15px', fontWeight: 'bold' }}>Address</label>
          <input
            type="text"
            value={artisanForm.address}
            onChange={(e) => handleArtisanFormChange('address', e.target.value)}
            placeholder="Shop no ...."
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#3a3a3a',
              color: '#d2b48c'
            }}
          />

          <label style={{ display: 'block', marginTop: '15px', fontWeight: 'bold' }}>Pincode</label>
          <input
            type="text"
            value={artisanForm.pincode}
            onChange={(e) => handleArtisanFormChange('pincode', e.target.value)}
            placeholder="xxxxxx"
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#3a3a3a',
              color: '#d2b48c'
            }}
          />

          <label style={{ display: 'block', marginTop: '15px', fontWeight: 'bold' }}>City</label>
          <input
            type="text"
            value={artisanForm.city}
            onChange={(e) => handleArtisanFormChange('city', e.target.value)}
            placeholder="Delhi"
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#3a3a3a',
              color: '#d2b48c'
            }}
          />

          <label style={{ display: 'block', marginTop: '15px', fontWeight: 'bold' }}>Country</label>
          <input
            type="text"
            value={artisanForm.country}
            onChange={(e) => handleArtisanFormChange('country', e.target.value)}
            placeholder="India"
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#3a3a3a',
              color: '#d2b48c'
            }}
          />

          <label style={{ display: 'block', marginTop: '15px', fontWeight: 'bold' }}>Choose Your Primary Craft:</label>
          <select
            value={artisanForm.primaryCraft}
            onChange={(e) => handleArtisanFormChange('primaryCraft', e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#3a3a3a',
              color: '#d2b48c'
            }}
          >
            <option value="">Select your main art form</option>
            <option value="zardozi">Zardozi Embroidery</option>
            <option value="meenakari">Meenakari Jewelry</option>
            <option value="terracotta">Terracotta Pottery</option>
            <option value="miniature">Miniature Painting</option>
          </select>

          <label style={{ display: 'block', marginTop: '15px', fontWeight: 'bold' }}>Years of Experience:</label>
          <select
            value={artisanForm.experience}
            onChange={(e) => handleArtisanFormChange('experience', e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#3a3a3a',
              color: '#d2b48c'
            }}
          >
            <option value="">Select your experience level</option>
            <option value="0-5">0-5 years</option>
            <option value="5-10">5-10 years</option>
            <option value="10+">10+ years</option>
          </select>

          <label style={{ display: 'block', marginTop: '15px', fontWeight: 'bold' }}>Your story</label>
          <textarea
            value={artisanForm.yourStory}
            onChange={(e) => handleArtisanFormChange('yourStory', e.target.value)}
            placeholder="Tell us about your craft journey..."
            rows="4"
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#3a3a3a',
              color: '#d2b48c',
              resize: 'vertical'
            }}
          />
          <p style={{ fontSize: '0.9rem', color: '#aaa', marginTop: '5px' }}>
            <em>This is very important! Our AI will use this to write a beautiful story for your profile. Please answer in your own words: How did you learn your craft? Who taught you? What does this art mean to you and your family?</em>
          </p>

          <h1 style={{ marginTop: '30px', marginBottom: '10px' }}>Add Your Products</h1>
          <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '20px' }}>
            (This section is repeatable. You can add multiple products.)
          </p>

          {/* Products Section */}
          {products.map((product, index) => (
            <div key={product.id} style={{
              border: '1px solid #444',
              padding: '15px',
              marginTop: '20px',
              borderRadius: '8px'
            }}>
              <h2>Product {index + 1}</h2>

              <label style={{ display: 'block', marginTop: '15px', fontWeight: 'bold' }}>Product Name:</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => handleProductChange(product.id, 'name', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  border: 'none',
                  borderRadius: '5px',
                  backgroundColor: '#3a3a3a',
                  color: '#d2b48c'
                }}
              />
              <p style={{ fontSize: '0.9rem', color: '#aaa' }}>Give your product a clear and descriptive name. E.g., "Handmade Blue Peacock Meenakari Earrings".</p>

              <label style={{ display: 'block', marginTop: '15px', fontWeight: 'bold' }}>Price (in ₹):</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) => handleProductChange(product.id, 'price', e.target.value)}
                min="1"
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  border: 'none',
                  borderRadius: '5px',
                  backgroundColor: '#3a3a3a',
                  color: '#d2b48c'
                }}
              />
              <p style={{ fontSize: '0.9rem', color: '#aaa' }}>Enter the price of your product in Indian Rupees.</p>

              <label style={{ display: 'block', marginTop: '15px', fontWeight: 'bold' }}>Product Images:</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(product.id, e.target.files)}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  border: 'none',
                  borderRadius: '5px',
                  backgroundColor: '#3a3a3a',
                  color: '#d2b48c'
                }}
              />
              <p style={{ fontSize: '0.9rem', color: '#aaa' }}>Upload up to 4 clear photos. Show the product from different angles, in good light. Good photos are key to good sales!</p>

              {product.images.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                  <h3>Image Previews:</h3>
                  {product.images.map((file, imgIndex) => (
                    <div key={imgIndex} style={{ margin: '10px 0' }}>
                      <p>Image {imgIndex + 1}: {file.name}</p>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => removeProduct(product.id)}
                style={{
                  backgroundColor: '#d2b48c',
                  color: '#1e1e1e',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                Remove This Product
              </button>
            </div>
          ))}

          <button
            onClick={addProduct}
            style={{
              backgroundColor: '#d2b48c',
              color: '#1e1e1e',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Add Another Product
          </button>

          <label style={{ display: 'flex', alignItems: 'center', marginTop: '20px', gap: '10px' }}>
            <input
              type="checkbox"
              checked={artisanForm.termsAgreement}
              onChange={(e) => handleArtisanFormChange('termsAgreement', e.target.checked)}
            />
            I have read and agree to the Terms and Conditions and Privacy Policy of Delhi KalaKar Connect.
          </label>

          <button
            onClick={handleArtisanSubmit}
            style={{
              backgroundColor: '#d2b48c',
              color: '#1e1e1e',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '20px',
              width: '100%',
              fontSize: '16px'
            }}
          >
            Create My AI-Powered Shop!
          </button>
        </div>
      </div>
    </div>
  );

  // Main render function
  return (
    <div style={styles.body}>
      {/* Header - shown on all pages except search */}
      {currentPage !== 'search' && (
        <header style={styles.header}>
          <h1 style={styles.headerTitle}>Kalakaar Konnect</h1>
          <nav style={styles.nav}>
            <a style={styles.navLink} onClick={() => navigateTo('home')}>Home</a>
            <a style={styles.navLink} onClick={() => navigateTo('about')}>About</a>
            <button style={{ ...styles.btn, ...styles.btnOutline }}>Contact Us</button>
            <button style={{ ...styles.btn, ...styles.btnPrimary }}>Sign Up / Log In</button>
          </nav>
        </header>
      )}

      {/* Page Content */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'search' && <SearchPage />}
      {currentPage === 'artisan' && <ArtisanDetailsPage />}
    </div>
  );
};

export default KalakaarKonnectApp;