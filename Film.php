
<?php
//class containing all the values of a film

class Film
{
    public $TitleID;
    public $Title;
    public $Year;
    public $Genre;
    public $Duration;
    public $Country;
    public $Language;
    public $Director;
    public $Writer;
    public $ProductionCompany;
    public $Description;
    public $AverageVote;
    public $Votes;
    public $Budget;
    public $USA_Income;
    public $Worldwide_Income;
    public $Metascore;
    public $UsersReview;
    public $CriticsReview;



    public function __construct($id, $original_title, $release_year, $genre, $duration, $country, $language, $director, $writer, $production_company, $description, $avg_vote, $votes, $budget, $usa_gross_income, $worldwide_gross_income, $metascore, $reviews_from_users, $reviews_from_critics)
    {
        $this->TitleID = $id;
        $this->Title = $original_title;
        $this->Year = $release_year;
        $this->Genre = $genre;
        $this->Duration = $duration;
        $this->Country = $country;
        $this->Language = $language;
        $this->Director = $director;
        $this->Writer = $writer;
        $this->ProductionCompany = $production_company;
        $this->Description = $description;
        $this->AverageVote = $avg_vote;
        $this->Votes = $votes;
        $this->Budget = $budget;
        $this->USA_Income = $usa_gross_income;
        $this->Worldwide_Income = $worldwide_gross_income;
        $this->Metascore = $metascore;
        $this->UsersReview = $reviews_from_users;
        $this->CriticsReview = $reviews_from_critics;
    }

    public function getId()
    {
        return $this->TitleID;
    }

    public function getTitle()
    {
        return $this->Title;
    }

    public function getYear()
    {
        return $this->Year;
    }


    public function getGenre()
    {
        return $this->Genre;
    }

    public function getDuration()
    {
        return $this->Duration;
    }


    public function getCountry()
    {
        return $this->Country;
    }

    public function getLanguage()
    {
        return $this->Language;
    }

    public function getDirector()
    {
        return $this->Director;
    }

    public function getWriter()
    {
        return $this->Writer;
    }

    public function getProductionCompany()
    {
        return $this->ProductionCompany;
    }

    public function getDescription()
    {
        return $this->Description;
    }

    public function getAverageVote()
    {
        return $this->AverageVote;
    }

    public function getVotes()
    {
        return $this->Votes;
    }

    public function getBudget()
    {
        return $this->Budget;
    }

    public function getUSA_Income()
    {
        return $this->USA_Income;
    }

    public function getWorldwide_Income()
    {
        return $this->Worldwide_Income;
    }

    public function getMetascore()
    {
        return $this->Metascore;
    }

    public function getUsersReviews()
    {
        return $this->UsersReview;
    }

    public function getCriticsReviews()
    {
        return $this->CriticsReview;
    }

}
?>
