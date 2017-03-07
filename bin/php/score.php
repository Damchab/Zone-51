<?php

error_reporting ( E_ALL );
include ("config.php");

try
{
	if (isset ( $_POST ['login'] ) && isset ( $_POST ['hightscore'] ) && isset ( $_POST ['level'] ) && $_POST ['hightscore'] !== '' && $_POST ['level'] !== '' && ($_POST ['login'] !== '' || $_POST ['login'] == 'invite'))
	{
// 		$login = $_POST ['login'];
		$connexion = new PDO ( $source, $user, $motDePasse );
		$requete = "SELECT ID FROM Users WHERE Login = '" . $_POST ['login'] . "'";
		$resultat = $connexion->query ( $requete );
		
		if ($resultat->rowCount () !== 0)
		{
			foreach ( $resultat as $ligne )
			{
				$id = $ligne ['ID'];
			}
			$requete = "INSERT INTO Scores(ID,IDLevel,IDUser,HightScore) VALUES ('','". $_POST ['level'] ."','". $id ."','". $_POST ['hightscore'] ."') ON DUPLICATE KEY UPDATE HightScore='". $_POST ['hightscore'] ."' ";
			$connexion->query ( $requete );
// 			die ();
		}
	}
// 	echo $login;
} catch ( PDOException $e )
{
	print 'Erreur de connection PDO : ' . $e->getMessage () . '<br />';
	die ();
}
?>