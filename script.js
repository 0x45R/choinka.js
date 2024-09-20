const clamp = function(number,min, max) {
  return Math.min(Math.max(number, min), max);
}; // funkcja clamp - przydatna dość

function getRandomInt(min, max) {
 const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
} // funkcja zdobywa losowe liczby całkowite od min, max włącznie

autoInterval = null // interwał dla 'auto choinki'

function auto(){
	// prosta funkcja gdy zmienna null to włącza powtarzanie
	if(autoInterval == null){
		autoButton.innerText = 'auto choinka (on)';
		autoInterval = setInterval(()=>drawTree(heightInput.value,randomRangeMinInput.value,randomRangeMaxInput.value),300)
	}else{
	// gdy nie to wyłącza powtarzanie
		autoButton.innerText = 'auto choinka (off)';
		clearInterval(autoInterval)
		autoInterval = null
	}
}
function treeToClipboard(containerRef="main"){
	// zdobywa odniesienie do elementu o takim id
	const container = document.getElementById(containerRef);
	// kopiuje zawartość kontenera do schowka użytkownika
	navigator.clipboard.writeText(container.innerText);
	// pokazuje wiadomość "skopiowano" w zawartości przycisku
	copyButton.innerText = "skopiowano!";
	// po czasie 3s usuwa wiadomość, przywracając stan poprzedni
	setTimeout(()=>copyButton.innerText="skopiuj choinke",3000)
}


const drawTree = (height = 8, randomRangeMin = 92, randomRangeMax = 33, separator = " ", containerRef = "main", min = 10, max = 40) => {
	// zdobywa odniesienie do elementu o takim id (podstawowo "main")
	const container = document.getElementById(containerRef);
	// resetuje zawartość
	container.innerHTML = "";

	// waliduje wielkość choinki
	if(height < min || height > max){
		errorLabel.setAttribute("invalid", `ERROR: choinka nie może być mniejsza niż ${min} lub większa niż ${max}`)
	}
	else{
		errorLabel.setAttribute("invalid","")
	}
	// sprawia że wielkość choinki mieści się w zakresie [min, max]
	height = clamp(height,min,max)

	// deklaracja zmiennych
	let sum = 0;
	let sumNoSpaces = 0;
	let size = 0;
	// generuje choinke
	for(i = 1;i<height*2+1;i+=2){
		// generuje znaki
		symbols = ""
		for(j = 0; j < i; j++){
			const code = getRandomInt(randomRangeMin, randomRangeMax)
			symbol = String.fromCodePoint(code )
			symbols+=symbol
		}
		// tworzy element (wiersz)
		const element = document.createElement("pre")
		// powtarza separator (podstawowo spację) daną ilość razy oraz dodaje losowe znaki wcześniej wygenerowane
		const result =	separator.repeat(height-((i)/2))+symbols
		// ustawia jego zawartość na znaki
		element.innerText = result
		// dodaje długość jednego wiersza do sumy
		sum += result.length

		sumNoSpaces += result.trim().length;

		// dodaje rozmiar (w bajtach) jednego wiersza do sumy rozmiaru
		size += new Blob([result]).size
		// dodaje wiersz do kontenera
		container.appendChild(element)
		  	
		
		
	}
	// ustawia paragraf z statystykami choinki
	// statystyki - rozmiar choinki (wysokość), suma znaków, wielkość znaków na dysku (np. emoji jest zapisywane jako 4 bajty, za to litera alfabetu łacinskiego jako 1)
	// oraz średnia liczba bajtów na znak
	statLabel.innerHTML = `${height} wierszy, ${sum} znaków (z spacjami), ${sumNoSpaces} znaków (bez spacji)<br>${size} bajtów (licząc spacje), średnio ${(size/sum).toFixed(2)}B na znak`


}
// wydrukuj choinkę z parametrami z dokumentu
drawTree(heightInput.value,randomRangeMinInput.value,randomRangeMaxInput.value)
