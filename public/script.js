function supprimer(id) {
    const routeComplete = '/api/equipe/' + id;

    fetch(routeComplete, { method: "DELETE" })
        .then(() => {
            // Après suppression, on recharge la page pour afficher la liste à jour
            window.location.reload();
        })
        .catch((erreur) => console.error('Erreur suppression :', erreur));
}
