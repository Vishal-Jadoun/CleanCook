import './MealCard.css';
function MealCard({meal}){
    return (
        <div className="meals">
            <span>{meal}</span>
        </div>
    );
}

export default MealCard;