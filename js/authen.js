
function login(){
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	let data = {
		"username": username,
		"password": password
	};

	fetch("http://localhost:3000/db_login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		.then(data => {
			if (data.status == "success") {
				localStorage.setItem("token", data.token);
				window.location.href = "/welcome";
			} else {
				alert("Invalid username or password");
			}
		})
		.catch((error) => {
			console.error('Error:', error);
	});
}

function authen() {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/db_authen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => response.json())
        .then(data_authen => {
            if (data_authen.message == 'Token is valid') {
                //pass
            } else {
                localStorage.removeItem('token');
				alert('Please login first!')
                window.location.href = '/login';
            }
            console.log('Success:', data_authen);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function addticket(){
	let startdes = document.getElementById("startdes").value;
	let endtdes = document.getElementById("endtdes").value;
	let tickettype = document.getElementById("tickettype").value;
	let trainnum = document.getElementById("trainnum").value;
	let date = document.getElementById("date").value;

	let data = {
		"departure_station": startdes,
		"terminal_station": endtdes,
		"ticket_type": tickettype,
		"train_number": trainnum,
		"available_date": date
	};

	fetch("http://localhost:3000/addtickets", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		.then(data => {
			if (data.status == "success") {
				alert("Add ticket success");
				//reload page
				window.location.reload();
			} else {
				alert("Error!! Please try again");
			}
		})
		.catch((error) => {
			console.error('Error:', error);
			alert("Error!! Please try again");
	});
}

function deleteticket(ticket_id){
	let data = {
		"ticket_id": ticket_id
	};

	fetch("http://localhost:3000/deletetickets", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		.then(data => {
			if (data.status == "success") {
				alert("Delete ticket success");
				//reload page
				window.location.reload();
			} else {
				alert("Error!! Please try again");
			}
		})
		.catch((error) => {
			console.error('Error:', error);
			alert("Error!! Please try again");
	});
}

function updateeticket(ticket_id){
	let data = {
		"ticket_id": ticket_id
	};

	fetch("http://localhost:3000/updatetickets", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		.then(data => {
			if (data.status == "success") {
				alert("Update ticket success");
				//reload page
				window.location.reload();
			} else {
				alert("Error!! Please try again");
			}
		})
		.catch((error) => {
			console.error('Error:', error);
			alert("Error!! Please try again");
	});
}


function modifyboxlist(){
	let data = {
		"departure_station": "",
		"terminal_station": "",
		"available_date": ""
	};
	fetch("http://localhost:3000/gettickets", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(res => {
		console.log(res.data);
		let modifyticketbox = document.getElementById("modifyticketbox");
		modifyticketbox = "<br><br>";
		for (let i = 0; i < res.data.length; i++) {
			//create modify ticket box
			modifyticketbox += `
				<div class="modifyticketbox"
					<p>Ticket ${i+1} <br> ${res.data[i].departure_station} >> ${res.data[i].terminal_station} </p><br>
					<p>Type: ${res.data[i].ticket_type}</p>
					<p>Train number: ${res.data[i].train_number}</p>
					<p>Available Date: ${res.data[i].available_date}</p>
					<div class="right">
						<button class="editt"><a href="#"><p>Edit</p></a></i>
						</button>
						<button class="deletee"><a href="#" onclick=deleteticket(${res.data[i].id})><p>Delete</p></a></i>
						</button>
					</div>
				</div>
			`
		}
		document.getElementById("modifyticketbox").innerHTML = modifyticketbox;
	})
	.catch((error) => {
		console.error('Error:', error);
	});
}

function search(){
	let data = {
		"departure_station": "",
		"terminal_station": "",
		"available_date": ""
	};

	fetch("http://localhost:3000/gettickets", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(res => {
		console.log(res.data);
		let destation = document.getElementById("destation").value;
		let terstation = document.getElementById("terstation").value;
		let datesearch = document.getElementById("datesearch").value;

		let search_result = document.getElementById("search_result");
		search_result.innerHTML = `
			<article class="headforsearchresult">
				<h1> Search Result </h1>
			</article>
		`
		let data_result = "";
		//console.log(res.data)
		let count = 0;
		for (let i = res.data.length-1; i >= 0; i--) {
			//console.log(destation)
			//console.log(res.data[i].departure_station)
			if (destation != "" && res.data[i].departure_station != destation){
				continue;
			}
			if (terstation != "" && res.data[i].terminal_station != terstation){
				continue;
			}
			if (datesearch != "" && res.data[i].available_date != datesearch){
				continue;
			}
			count++;
			data_result += `
				<article class="column">
					<h2>Ticket ${count}</h2>
					<a href="#" class="readmoredetail"> Read more detail </a>
					<section class="dummy_text">
					${res.data[i].departure_station} >> ${res.data[i].terminal_station}
					<br> Date: ${res.data[i].available_date}
					<article class="dummy_box">
					<form class="contain_row">
						<div class="row inline">
						Departure Station <br> ${res.data[i].departure_station}
						</div>
						<div class="row inline">
						Terminal Station <br> ${res.data[i].terminal_station}
						</div>
						<div class="row inline">
						Type <br> ${res.data[i].ticket_type}
						</div>
						<div class="row inline">
						Train <br> ${res.data[i].train_number}
						</div>
						<div class="row inline">
						<a href="#" id="editbox"> Click for edit </a>
						</div>
					</form>
					</article>
				</article>
			`
		}
		if (count == 0){
			data_result = `
				<article class="column">
					<h2> No result </h2>
				</article>
			`
		}
		search_result.innerHTML += data_result;

	})
	.catch((error) => {
		console.error('Error:', error);
	});
}

function getadmin(){
	let data = {
		"adminID": "",
		"admin_username": "",
		"admin_fullname": ""
	};

	fetch("http://localhost:3000/getadmin", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(res => {
		console.log(res.data);
		let searchuser_results = document.getElementById("searchuser_results");

		let admin_id = document.getElementById("admin_id").value;
		let admin_username = document.getElementById("admin_username").value;
		let admin_fullname = document.getElementById("admin_fullname").value;

		let data_result = "";
		let count = 0;

		for (let i = 0; i < res.data.length; i++) {

			if (admin_id != "" && res.data[i].adminID != admin_id){
				continue;
			}
			if (admin_username != "" && res.data[i].admin_username != admin_username){
				continue;
			}
			if (admin_fullname != "" && res.data[i].admin_fullname != admin_fullname){
				continue;
			}
			count++;
			data_result += `<div class="user">
			<div class="sameline">
			<!-- Supitcha Image -->
			<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" width="50" height="50">
			<h4> &nbsp; ${res.data[i].admin_email}</h4>
			</div>
			<div class="right">
			<button class="edit"><a href="#">Edit</a></i>
			</button>
			<button class="delete" onclick="deleteadmin(${res.data[i].adminID})"><a href="#">Delete</a></i>
			</button>
			</div>
		</div>`
		}
		if (count == 0){
			data_result = `
				<div class="user">
			<div class="sameline">
			<h4> &nbsp; No result</h4>
			</div>
		</div>`
		}
		searchuser_results.innerHTML = data_result;

	})
	.catch((error) => {
		console.error('Error:', error);
	});
}

function deleteadmin(adminID){
	fetch("http://localhost:3000/deleteadmin", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			adminID: adminID
		})
	})
	.then(response => response.json())
	.then(res => {
		console.log(res.data);
		if (res.status == "success"){
			//reload page
			location.reload();
		}
	})
	.catch((error) => {
		console.error('Error:', error);
	});
}

function addadmin(){
	let admin_fullname = document.getElementById("admin_fullname").value;
	let admin_username = document.getElementById("admin_username").value;
	let admin_email = document.getElementById("admin_email").value;
	let admin_phonenum = document.getElementById("admin_phonenum").value;
	let admin_role = document.getElementById("admin_role").value;
	let admin_address = document.getElementById("admin_address").value;
	let admin_password = document.getElementById("admin_password").value;
	let admin_confpassword = document.getElementById("admin_confpassword").value;

	if (admin_password != admin_confpassword){
		alert("Password not match");
		return;
	}
	if (admin_password.length > 8){
		alert("Password max length is 8")
		return;
	}

	fetch("http://localhost:3000/add_admin", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			admin_fullname: admin_fullname,
			admin_username: admin_username,
			admin_email: admin_email,
			admin_phonenum: admin_phonenum,
			admin_role: admin_role,
			admin_address: admin_address,
			admin_password: admin_password,
			admin_confpassword: admin_password
		})
	})
	.then(response => response.json())
	.then(res => {
		console.log(res.data);
		if (res.status == "success"){
			//reload page
			alert('Add admin success');
			window.location.href = "/usermanage";
		}
		else {
			alert("Error")
		}
	}
	)
}
