import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LS_PREFIX } from "../utils";

let navigate = null;

function toggleMenu() {
  var x = document.getElementById("main-nav");
  if (x.style.display === "flex") {
    x.style.display = "none";
  } else {
    x.style.display = "flex";
  }
  return false;
}

function getNotification(event) {
	event.preventDefault();

	const cachedNowPlaying = localStorage.getItem(LS_PREFIX+'movies');
	let options = null, notifTitle = null;
	if (cachedNowPlaying) {
		const movies = JSON.parse(cachedNowPlaying);
		const randomItem = Math.floor(Math.random() * movies.length);
		const movie = movies[randomItem];
		notifTitle = `Latest Release: ${movie.title}`;
		options = {
			body: movie.title,
			icon: movie.posterPath,
		};
	} else {
		notifTitle = "No movie results";
		options = {
			body: "No movie to display",
			icon: "/images/icons/icon-32.png",
		};
	}

	new Notification(notifTitle, options);
}

async function reset(event) {
	event.preventDefault();

	//delete all localStorage items
	localStorage.clear();
	console.log("Deleted local storage");

	//delete all caches
	const keyList = await caches.keys();
	keyList.forEach(key => {
		caches.delete(key);
		console.log("Deleted cache "+key);
	});

	//unregister service worker
	navigator.serviceWorker.getRegistrations().then(regs => {
		regs.forEach(reg => {
			console.log("[Service Worker] unregistering", reg);
			reg.unregister();	
		});
	}).catch(function(err) {
		console.log("[Service Worker] unregistration failed: ", err);
	});

	//redirect to login page so service worker can regregister and rebuild cache
	navigate('/');
}

const Header = ({searchText, search, disabled=true}) => {
	navigate = useNavigate();
	const notifAllowed = Notification.permission === 'granted' ? true : false;
	return (
		<header>
			<h2>PWA Now Playing</h2>
			<div>
				<input
					value={searchText}
					onChange={search}
					type="text"
					placeholder="Search..."
					disabled={disabled}
				/>
			<div id="main-nav">
				<Link to="/phone">Phone</Link>
			{ notifAllowed ? (
    		<Link to="/movies" onClick={getNotification}>Get Notif</Link>
    	) : null }
    		<Link to="/" onClick={reset} title="Clear cache, local storage and service worker">Reset</Link>
    		<Link to="/">Logout</Link>
  		</div>

  		<button onClick={toggleMenu}>=</button>
  		</div>
		</header>
	)
};

export default Header;