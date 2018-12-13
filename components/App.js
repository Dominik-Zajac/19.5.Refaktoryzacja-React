const GIPHY_API_URL = 'https://api.giphy.com';
const GIPHY_PUB_KEY = 'xNEbJNreq63SELIRSP6e0Y3N3jnasbV3';

App = React.createClass({
	getInitialState() {
		return {
			loading: false,
			searchingText: '',
			gif: {}
		};
	},

	handleSearch(searchingText) {
	    this.setState({
		loading: true
	    });
	    this.getGif(searchingText)
		.then(response =>
		    this.setState({
			loading: false,
			gif: response,
			searchingText
		    })
		)
		.catch(error => console.log('Error!', error));
	},

	getGif(searchingText) {
	    const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
	    return new Promise(
	        function(resolve, reject) {
	            const xhr = new XMLHttpRequest();
	            xhr.open('GET', url);
	            xhr.onload = () => {
	                if (xhr.status === 200) {
	                    const data = JSON.parse(xhr.responseText).data;
	                    const gif = {
	                        url: data.fixed_width_downsampled_url,
	                        sourceUrl: data.url
	                    };
	                    resolve(gif);
	                } else {
	                    reject(new Error(this.statusText));
	                }
	            };
	            xhr.onerror = () => {
	                reject(new Error(
	                    `XMLHttpRequest Error: ${this.statusText}`));
	            };
	            xhr.send();
	        }
	    );
	},

	render() {
		const styles = {
			textAlign: 'center',
			width: '90%'
		};

		return (
			<div className={'container'} style={styles}>
				<h1>Wyszukiwarka GIF-ow!</h1>
				<p>Znajdz gif-a na <a href='http://giphy.com'>giphy</a>!<br></br>Nacisnij enter, aby pobrac kolejnego GIF-a.</p><
				Search onSearch={
					this.handleSearch
				}/>
				<Gif
					loading={
						this.state.loading
					}
					url={
						this.state.gif.url
					}
					sourceUrl={
						this.state.gif.sourceUrl
					}
				/>
			</div>
		);
	}
});
