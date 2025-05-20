 document.getElementById("bookingForm").addEventListener("submit", function (event) {
                event.preventDefault();

                const fullName = this.querySelector('input[type="text"]').value;
                const checkInDates = this.querySelectorAll('input[type="date"]');
                const checkInDate = checkInDates[0].value;
                const checkOutDate = checkInDates[1].value;
                const room = this.querySelector('select').value;

                // Create a booking card
                const bookingCard = document.createElement("div");
                bookingCard.className = "col-md-4";
                bookingCard.innerHTML = `
    <div class="card p-3 m-2 bg-light">
        <h5 class="text-center" id="name-${fullName}">${fullName}</h5>
        <p><strong>Check-in:</strong> <span id="checkin-${fullName}">${checkInDate}</span></p>
        <p><strong>Check-out:</strong> <span id="checkout-${fullName}">${checkOutDate}</span></p>
        <p><strong>Room:</strong> <span id="room-${fullName}">${room}</span></p>
        <button class="btn btn-warning mt-2" onclick="editBooking('${fullName}')">Edit</button>
    </div>
`;
                bookedList.appendChild(bookingCard);



                function editBooking(fullName) {
                    // Prompt the user to input new details
                    const newName = prompt("Enter new name:", fullName);
                    const newCheckIn = prompt("Enter new check-in date (yyyy-mm-dd):");
                    const newCheckOut = prompt("Enter new check-out date (yyyy-mm-dd):");
                    const newRoom = prompt("Enter new room type:");

                    if (newName && newCheckIn && newCheckOut && newRoom) {
                        
                        document.getElementById(`name-${fullName}`).innerText = newName;
                        document.getElementById(`checkin-${fullName}`).innerText = newCheckIn;
                        document.getElementById(`checkout-${fullName}`).innerText = newCheckOut;
                        document.getElementById(`room-${fullName}`).innerText = newRoom;

                      
                        let bookings = JSON.parse(localStorage.getItem("hotelBookings")) || [];

                      
                        bookings = bookings.map(b => {
                            if (b.fullName === fullName) {
                                return {
                                    fullName: newName,
                                    checkInDate: newCheckIn,
                                    checkOutDate: newCheckOut,
                                    room: newRoom
                                };
                            }
                            return b;
                        });

                        // Save the updated bookings back to localStorage
                        localStorage.setItem("hotelBookings", JSON.stringify(bookings));

                        alert("Booking updated successfully!");
                    } else {
                        alert("All fields are required to update the booking!");
                    }
                }




              
                let bookings = JSON.parse(localStorage.getItem("hotelBookings")) || [];
                bookings.push({ fullName, checkInDate, checkOutDate, room });
                localStorage.setItem("hotelBookings", JSON.stringify(bookings));

                this.reset();
            });




            const rooms = [
                { id: 1, name: "Deluxe Room1", price: 1500, available: true },
                { id: 2, name: "Suite Room1", price: 1800, available: true },
                { id: 3, name: "Standard Room1", price: 1000, available: true },
                { id: 4, name: "deluxe Room2", price: 1500, available: true },
                { id: 5, name: "Suite Room2", price: 1800, available: true },
                { id: 6, name: "Standard Room2", price: 1000, available: true }
            ];


            function checkAvailability() {
                const checkInDate = document.getElementById("checkInDate").value;
                const checkOutDate = document.getElementById("checkOutDate").value;
                const availabilityDiv = document.getElementById("availabilityResults");

                if (!checkInDate || !checkOutDate) {
                    alert("Please select both check-in and check-out dates.");
                    return;
                }

                let availableRoomsHTML = "<h3 class='text-center'>Available Rooms</h3><div class='row'>";

                rooms.forEach(room => {
                    availableRoomsHTML += `
            <div class='col-md-4'>
                <div class='card p-3 m-2'>
                    <h5>${room.name}</h5>
                    <button class='btn btn-success' onclick='bookRoom(${room.id}, "${room.name}")'>Book Now</button>
                </div>
            </div>`;
                });

                availableRoomsHTML += "</div>";
                availabilityDiv.innerHTML = availableRoomsHTML;
            }

            function bookRoom(roomId, roomName) {
                document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
                document.querySelector("#booking select").value = roomName;
            }




            const menuItems = [
                { id: 1, name: "Tomato Soup", category: "starter", price: 5 },
                { id: 2, name: "veg Salad", category: "starter", price: 7 },
                { id: 3, name: "Grilled Chicken", category: "main", price: 15 },
                { id: 4, name: "fried rice", category: "main", price: 12 },
                { id: 5, name: "Chocolate Cake", category: "dessert", price: 8 },
                { id: 6, name: "Mango Smoothie", category: "drink", price: 6 },
                { id: 8, name: "mutton briyani", category: "main", price: 20 },
                { id: 8, name: "chicken shawarma", category: "rolls", price: 20 },
                { id: 7, name: "Coke", category: "drink", price: 3 }
            ];

            function displayMenu(items) {
                const menuList = document.getElementById("menuList");
                menuList.innerHTML = ""; // Clear previous items

                if (items.length === 0) {
                    menuList.innerHTML = "<p class='text-danger text-center'>No items available.</p>";
                    return;
                }

                items.forEach(item => {
                    menuList.innerHTML += `
                <div class="col-md-4">
                    <div class="menu-item">
                        <h4>${item.name}</h4>
                        <p>Price: $${item.price}</p>
                    </div>
                </div>
              `;
                });
            }
        

            function filterMenu(category) {
                if (category === "all") {
                    displayMenu(menuItems);
                } else {
                    const filteredItems = menuItems.filter(item => item.category === category);
                    displayMenu(filteredItems);
                }
            }
            displayMenu(menuItems);

            document.getElementById("bookingForm").addEventListener("submit", function (event) {
                event.preventDefault();


                const fullName = this.querySelector('input[type="text"]').value;
                const checkIn = this.querySelector('input[type="date"]').value;
                const room = this.querySelector('select').value;

                const booking = {
                    fullName: fullName,
                    checkInDate: checkIn,
                    room: room
                };

                
                let bookings = JSON.parse(localStorage.getItem("hotelBookings")) || [];

                bookings.push(booking);

              
                localStorage.setItem("hotelBookings", JSON.stringify(bookings));

                alert("Booking Confirmed and saved locally! Thank you for choosing our hotel.");

              
                this.reset();
            });
            
