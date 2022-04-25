<?php
    require "dbinfo.php";
    require "RestService.php";
    require "Film.php";


class FilmsRestService extends RestService
{
	private $films;
    
	public function __construct() 
	{
		// Passing in the string 'books' to the base constructor ensures that
		// all calls are matched to be sure they are in the form http://server/books/x/y/z 
		parent::__construct("films");
	}

	//get function of the REST API to get the films from the database
	public function performGet($url, $parameters, $requestBody, $accept) 
	{
		switch (count($parameters))
		{
			case 1:	// 127.0.0.1/Films_API.PHP/Films/

				// Note that we need to specify that we are sending JSON back or
				// the default will be used (which is text/html).
				header('Content-Type: application/json; charset=utf-8');
				// This header is needed to stop IE cacheing the results of the GET	
				header('no-cache,no-store');
				$this->getAllFilms();

				echo json_encode($this->films);
				break;

			case 2:
				$id = $parameters[1];
				$film = $this->getFilmById($id);
				if ($film != null)
				{
					header('Content-Type: application/json; charset=utf-8');
					header('no-cache,no-store');
					echo json_encode($film);
				}
				else
				{
					$this->notFoundResponse();
				}
				break;


				
			default:	
				$this->methodNotAllowedResponse();
		}
	}

	//post function of the REST API to add new films to the database
	public function performPost($url, $parameters, $requestBody, $accept) 
	{
		global $dbserver, $dbusername, $dbpassword, $dbdatabase;

		$newFilm = $this->extractFilmFromJSON($requestBody);
		$connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
		if (!$connection->connect_error)
		{
			$sql = "insert into films (original_title, release_year, genre, duration, country, language, director, writer, production_company, description, avg_vote, votes, budget, usa_gross_income, worldwide_gross_income, metascore, reviews_from_users, reviews_from_critics) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			// We pull the fields of the book into local variables since 
			// the parameters to bind_param are passed by reference.
			$statement = $connection->prepare($sql);
			$original_title = $newFilm->getTitle();
			$release_year = $newFilm->getYear();
			$genre = $newFilm->getGenre();
			$duration = $newFilm->getDuration();
			$country = $newFilm->getCountry();
			$languages = $newFilm->getLanguage();
			$director = $newFilm->getDirector();
			$writer = $newFilm->getWriter();
			$production_company = $newFilm->getProductionCompany();
			$description = $newFilm->getDescription();
			$avg_vote = $newFilm->getAverageVote();
			$votes = $newFilm->getVotes();
			$budget = $newFilm->getBudget();
			$usa_gross_income = $newFilm->getUSA_Income();
			$worldwide_gross_income = $newFilm->getWorldwide_Income();
			$metascore = $newFilm->getMetascore();
			$reviews_from_users = $newFilm->getUsersReviews();
			$reviews_from_critics = $newFilm->getCriticsReviews();

			$statement->bind_param('sisissssssdidddddd',  $original_title, $release_year,  $genre, $duration, $country, $languages, $director, $writer, $production_company, $description, $avg_vote, $votes, $budget, $usa_gross_income, $worldwide_gross_income, $metascore, $reviews_from_users, $reviews_from_critics );
			$result = $statement->execute();
			if ($result == FALSE)
			{
				$errorMessage = $statement->error;
			}
			$statement->close();
			$connection->close();
			if ($result == TRUE)
			{
				// We need to return the status as 204 (no content) rather than 200 (OK) since
				// we are not returning any data
				$this->noContentResponse();
			}
			else
			{
				$this->errorResponse($errorMessage);
			}
		}
	}

	//put function of the REST API to edit the films
	public function performPut($url, $parameters, $requestBody, $accept)
	{
		global $dbserver, $dbusername, $dbpassword, $dbdatabase;

		$newFilm = $this->extractFilmFromJSON($requestBody);
		$connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
		if (!$connection->connect_error)
		{
			$sql = "update films set original_title = ?, release_year = ?, genre = ?, duration = ?, country = ?, language = ?, director = ?, writer = ?, production_company = ?, description = ?, avg_vote = ?, votes = ?, budget = ?, usa_gross_income = ?, worldwide_gross_income = ?, metascore = ?, reviews_from_users = ? , reviews_from_critics = ? where id = ?";
			// We pull the fields of the book into local variables since 
			// the parameters to bind_param are passed by reference.
			$statement = $connection->prepare($sql);
			$filmId = $newFilm->getId();
			$original_title = $newFilm->getTitle();
			$release_year = $newFilm->getYear();
			$genre = $newFilm->getGenre();
			$duration = $newFilm->getDuration();
			$country = $newFilm->getCountry();
			$languages = $newFilm->getLanguage();
			$director = $newFilm->getDirector();
			$writer = $newFilm->getWriter();
			$production_company = $newFilm->getProductionCompany();
			$description = $newFilm->getDescription();
			$avg_vote = $newFilm->getAverageVote();
			$votes = $newFilm->getVotes();
			$budget = $newFilm->getBudget();
			$usa_gross_income = $newFilm->getUSA_Income();
			$worldwide_gross_income = $newFilm->getWorldwide_Income();
			$metascore = $newFilm->getMetascore();
			$reviews_from_users = $newFilm->getUsersReviews();
			$reviews_from_critics = $newFilm->getCriticsReviews();
			$statement->bind_param('sisissssssdiddddddi',  $original_title, $release_year,  $genre, $duration, $country, $languages, $director, $writer, $production_company, $description, $avg_vote, $votes, $budget, $usa_gross_income, $worldwide_gross_income, $metascore, $reviews_from_users, $reviews_from_critics, $filmId );
			$result = $statement->execute();
			if ($result == FALSE)
			{
				$errorMessage = $statement->error;
			}
			$statement->close();
			$connection->close();
			if ($result == TRUE)
			{
				// We need to return the status as 204 (no content) rather than 200 (OK) since
				// we are not returning any data
				$this->noContentResponse();
			}
			else
			{
				$this->errorResponse($errorMessage);
			}
		}
	}

	//delete function from the REST API to delete films on the database
    public function performDelete($url, $parameters, $requestBody, $accept) 
    {
		global $dbserver, $dbusername, $dbpassword, $dbdatabase;
		
		if (count($parameters) == 2)
		{
			$connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
			if (!$connection->connect_error)
			{
				$id = $parameters[1];
				$sql = "delete from films where id = ?";
				$statement = $connection->prepare($sql);
				$statement->bind_param('i', $id);
				$result = $statement->execute();
				if ($result == FALSE)
				{
					$errorMessage = $statement->error;
				}
				$statement->close();
				$connection->close();
				if ($result == TRUE)
				{
					// We need to return the status as 204 (no content) rather than 200 (OK) since
					// we are not returning any data
					$this->noContentResponse();
				}
				else
				{
					$this->errorResponse($errorMessage);
				}
			}
		}
    }

    //function that use a query to get the films from the database
    private function getAllFilms()
    {
		global $dbserver, $dbusername, $dbpassword, $dbdatabase;
		;

	
		$connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
		if (!$connection->connect_error)
		{



			$query = "select id, original_title, release_year, genre, duration, country, language, director, writer, production_company, description, avg_vote, votes, budget, usa_gross_income, worldwide_gross_income, metascore, reviews_from_users, reviews_from_critics from films ";
			if ($result = $connection->query($query))
			{
				while ($row = $result->fetch_assoc())
				{
					$this->films[] = new Film($row["id"], $row["original_title"], $row["release_year"],  $row["genre"], $row["duration"], $row["country"], $row["language"], $row["director"], $row["writer"], $row["production_company"], $row["description"], $row["avg_vote"], $row["votes"], $row["budget"], $row["usa_gross_income"], $row["worldwide_gross_income"], $row["metascore"], $row["reviews_from_users"], $row["reviews_from_critics"]);
				}
				$result->close();
			}
			$connection->close();
		}
	}	 

    private function getFilmById($id)
    {
		global $dbserver, $dbusername, $dbpassword, $dbdatabase;
		
		$connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
		if (!$connection->connect_error)
		{
			$query = "select original_title, release_year, genre, duration, country, language, director, writer, production_company, description, avg_vote, votes, budget, usa_gross_income, worldwide_gross_income, metascore, reviews_from_users, reviews_from_critics from films where id = ?";
			$statement = $connection->prepare($query);
			$statement->bind_param('i', $id);
			$statement->execute();
			$statement->store_result();
			$statement->bind_result($original_title, $release_year,  $genre, $duration, $country, $languages, $director, $writer, $production_company, $description, $avg_vote, $votes, $budget, $usa_gross_income, $worldwide_gross_income, $metascore, $reviews_from_users, $reviews_from_critics);
			if ($statement->fetch())
			{
				return new Film($id, $original_title, $release_year,  $genre, $duration, $country, $languages, $director, $writer, $production_company, $description, $avg_vote, $votes, $budget, $usa_gross_income, $worldwide_gross_income, $metascore, $reviews_from_users, $reviews_from_critics);
			}
			else
			{
				return null;
			}
			$statement->close();
			$connection->close();
		}
	}	



    private function extractFilmFromJSON($requestBody)
    {
		// This function is needed because of the perculiar way json_decode works. 
		// By default, it will decode an object into a object of type stdClass.  There is no
		// way in PHP of casting a stdClass object to another object type.  So we use the
		// approach of decoding the JSON into an associative array (that's what the second
		// parameter set to true means in the call to json_decode). Then we create a new
		// Film object using the elements of the associative array.  Note that we are not
		// doing any error checking here to ensure that all of the items needed to create a new
		// film object are provided in the JSON - we really should be.
		$filmArray = json_decode($requestBody, true);
		$film = new Film($filmArray['TitleID'],
			             $filmArray['Title'],
			             $filmArray['Year'],
						 $filmArray['Genre'],
						 $filmArray['Duration'],
						 $filmArray['Country'],
		                 $filmArray['Language'],
			             $filmArray['Director'],
			             $filmArray['Writer'],
						 $filmArray['ProductionCompany'],
						 $filmArray['Description'],
						 $filmArray['AverageVote'],
			             $filmArray['Votes'],
			             $filmArray['Budget'],
			             $filmArray['USA_Income'],
			             $filmArray['Worldwide_Income'],
			             $filmArray['Metascore'],
			             $filmArray['UsersReview'],
						 $filmArray['CriticsReview']);
		unset($filmArray);
		return $film;
	}
}
?>
