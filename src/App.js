import './App.css';
import React, {useState, useCallback, useEffect} from 'react';
import firestore from './firebase'; // Updated import statement

function App() {
  // const [foods, setFoods] = useState([
  // { id: 1, name: 'Assorted Hand Fruit', calories: 72, protein:1, carb:19, fiber:0 },
  // { id: 2, name: 'Bagel', calories: 111, protein:4, carb:20, fiber:1 },
  // { id: 3, name: 'Baked Chicken', calories: 377, protein:38, carb:13, fiber:19 },
  // { id: 4, name: 'Belgian Waffle', calories: 140, protein:3, carb:15, fiber:1 },
  // { id: 5, name: 'Charred Asparagus', calories: 37, protein:2, carb:4 , fiber:2},
  // { id: 6, name: 'Cheeseburger', calories: 389, protein:25, carb:1, fiber:31 },
  // { id: 7, name: 'Chicken Adobo', calories: 346, protein:26, carb:14, fiber:1 },
  // { id: 8, name: 'Chicken Noodle Soup', calories: 61, protein:4, carb:8, fiber:1 },
  // { id: 9, name: 'Crispy Bacon', calories: 115, protein:8, carb:0, fiber:0 },
  // { id: 10, name: 'Fettuccine with Herbed Butter Sauce', calories: 261, protein:7, carb:37, fiber:2 },
  // { id: 11, name: 'French Toast Sticks', calories: 274, protein:5, carb:39, fiber:3 },
  // { id: 12, name: 'Fresh Berries', calories: 30, protein:2, carb:7, fiber:0 },
  // { id: 13, name: 'Hard Boiled Egg', calories: 77, protein:7, carb:0, fiber:5 },
  // { id: 14, name: 'Hash Brown Triangle Patty', calories: 115, protein:1, carb:14, fiber:5 },
  // { id: 15, name: 'Hot Dog On A Bun', calories: 216, protein:9, carb:16, fiber:17 },
  // { id: 16, name: 'Huevos Rancheros', calories: 137, protein:6, carb:3, fiber:0 },
  // { id: 17, name: 'Minestrone Soup', calories: 92, protein:3, carb:1, fiber:3},
  // { id: 18, name: 'Muffin', calories: 134, protein:5, carb:24, fiber:1 },
  // { id: 19, name: 'Oatmeal', calories: 88, protein:4,  carb:15, fiber:2},
  // { id: 20, name: 'Pancakes', calories: 89, protein:2, carb:17, fiber:1 },
  // { id: 21, name: 'Pepperoni Pizza', calories: 249, protein:10, carb:27 , fiber:11 },
  // { id: 22, name: 'Pork Roll', calories: 166, protein:10, carb:0, fiber:14},
  // { id: 23, name: 'Scrambled Eggs', calories: 263, protein:0, carb:2, fiber:28 },
  // { id: 24, name: 'Scrambled Egg Whites', calories: 302, protein:9, carb:1, fiber:0 },
  // { id: 25, name: 'Spaghetti with Olive Oil', calories: 712, protein:22, carb:131, fiber:9 },
  // { id: 26, name: 'Tater Tot Puffs', calories: 229, protein:3, carb:28, fiber:3},
  // { id: 27, name: 'Thai Quinoa Salad', calories: 163, protein:6, carb:31, fiber:2 },
  // { id: 28, name: 'Tofu Scramble', calories: 85, protein:3, carb:11, fiber:4 },
  // { id: 29, name: 'Turkey Sausage Patty', calories: 89, protein:6, carb:1, fiber:7 },
  // { id: 30, name: 'Turkey Wrap', calories: 563, protein:28, carb:60, fiber:21 },
  // { id: 31, name: 'Vegan Curried Cauliflower', calories: 46, protein:2, carb:9, fiber:3 },
  // { id: 32, name: 'Rotisserie Chicken', calories: 135, protein:24, carb:2, fiber:3 },
  // { id: 33, name: '100% Natural Rolled Oatmeal', calories: 88, protein:4, carb:15, fiber:1 },

  // ]);
  const [foods, setFoods] = useState([])
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const foodCollection = firestore.collection('foods').orderBy('name');
        const snapshot = await foodCollection.get();
        const fetchedFoods = snapshot.docs.map((doc) => doc.data());
        setFoods(fetchedFoods);
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    };

    fetchFoods();
  }, []);

  // Creating a cart in the form of an empty list
  const[cartItems,setCartItems] = useState([])


  // Funtion to add food to cart
  const addCart = (food) => {
    setCartItems([...cartItems,food])
  }

  // Function to delete food from cart
  const deleteCartItem = (index) => {
      const newCartItems = [...cartItems];
      newCartItems.splice(index, 1);
      setCartItems(newCartItems);
  }

  // Function to calculate total calories
  const totalCalories = () => {
    let total = 0;
    let totalPro = 0;
    let totalCarb = 0;
    let totalFiber = 0;
    for (let i=0;i<cartItems.length;i++){
      total+= cartItems[i].calories
      totalPro+= cartItems[i].protein
      totalCarb+= cartItems[i].carb
      totalFiber+= cartItems[i].fiber
    }
    return (
      <ul>
        <li>Total Calories: {total}</li>
        <li>Protein: {totalPro}g</li>
        <li>Carbs: {totalCarb}g</li>
        <li>Fat: {totalFiber}g</li>
      </ul>
    )

  }
  // Handle username's change
  const[userName,setUserName] = useState("");
  const handleUserName = (e) => {
    setUserName(e.target.value);
  }
  
  // Create a list of user names and their macros breakdown:
  const[profiles, setProfiles] = useState([]);

  const saveUserProfile = () => {
  if (!userName) {
    alert("Have to input username!");
    return;
  }
  if (!cartItems) {
    alert("Have to add food to cart!");
    return;
  }
  let total = 0;
  let totalPro = 0;
  let totalCarb = 0;
  let totalFiber = 0;
  for (let i=0;i<cartItems.length;i++){
    total+= cartItems[i].calories
    totalPro+= cartItems[i].protein
    totalCarb+= cartItems[i].carb
    totalFiber+= cartItems[i].fiber
  }
  const newProfile = {
    username: userName,
    tcalo: total,
    tprotein: totalPro,
    tcarb: totalCarb,
    tfiber: totalFiber,
  };
  // setProfiles([...profiles,newProfile])
  // setCartItems([])
  // setUserName("")
  const profilesCollection = firestore.collection('profiles');
  profilesCollection.add(newProfile)
  .then(() => {
    alert('Profile saved successfully!');
    setProfiles([...profiles,newProfile])
    setCartItems([]);
    setUserName('');
  })
  .catch((error) => {
    console.error('Error saving profile:', error);
    alert('Failed to save profile. Please try again.', error);
  });

  }
  // Create a dropdown menu

  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  }

  // Retrieve the Profile when clicking it
  const retrieveProfile = (username,profile) => {
    setIsNavOpen(!isNavOpen);
    const oldProfile = {
      id: 0, 
      name: '', 
      calories: profile.tcalo, 
      protein: profile.tprotein,
      carb: profile.tcarb, 
      fiber: profile.tfiber,
    }
    setCartItems([oldProfile]);
    setUserName(username);
  }


  return (
    <div className="App">
      <div className="heading">
        <div className="title">
          <h3>VILLANOVA UNIVERSITY</h3>
          <h1>CALORIES TRACKER</h1>
        </div>
        {isNavOpen && (
          <div id="myNav" className="overlay" >
            <div className='overlay-content'>
            <thead>
              <th>Username</th>
              <th>Calories</th>
              <th>Protein</th>
              <th>Carbs</th>
              <th>Fat</th>
              <th></th>
            </thead>
            <tbody>
              {profiles.map((profile)=>(
                <tr key={profile.username} style={{cursor:"pointer"}} onClick={()=>retrieveProfile(profile.username,profile)}>
                  <td>{profile.username}</td>
                  <td>{profile.tcalo}cal</td>
                  <td>{profile.tprotein}g</td>
                  <td>{profile.tcarb}g</td>
                  <td>{profile.tfiber}g</td>
                </tr>
              ))}
            </tbody>
            </div>
          </div>    
        )}
        <span style={{cursor: 'pointer', color: 'whitesmoke', marginTop: 'auto', fontSize: '35px'}} onClick={toggleNav}> &#9776;</span>
      </div>



    <div className='tableContainer'>
    <table className="Menu">
      <thead>
        <th>Food</th>
        <th>Calories</th>
        <th>Protein</th>
        <th>Carbs</th>
        <th>Fat</th>
        <th></th>
      </thead>
      <tbody>
      {foods.map((food)=>(
        <tr key={food.id}>
          <td className="foodName">{food.name}</td>
          <td>{food.calories}cal</td>
          <td>{food.protein}g</td>
          <td>{food.carb}g</td>
          <td>{food.fiber}g</td>
          <td><button onClick={()=> addCart(food)}>Add</button></td>
        </tr>
      ))}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      </tbody>
    </table>
    </div>


    

    <div className="your-Cart">
        <h3>Nutrition Value</h3>
        <div className="total">
          <p><strong>Username:
             <input type="text" value={userName} onChange={handleUserName}/>
            </strong></p>
          <ul>
            {totalCalories()} 
          </ul>

        </div>

        <div className='your-Cart-container'>
        <table className="Menu">
          <thead>
            <th>Food</th>
            <th>Calories</th>
            <th>Protein</th>
            <th>Carbs</th>
            <th>Fat</th>
            <th></th>
          </thead>

          <tbody>
          {cartItems.map((item,index)=>(
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.calories}cal</td>
              <td>{item.protein}g</td>
              <td>{item.carb}g</td>
              <td>{item.fiber}g</td>
              <td><button onClick={()=>deleteCartItem(index)}>Clear</button></td>
            </tr>
          )
          )}


          </tbody>

        </table>

        </div>

        <button className="save-Button" onClick={saveUserProfile}>Save</button>
    </div>

  </div>

  );
}

export default App;
