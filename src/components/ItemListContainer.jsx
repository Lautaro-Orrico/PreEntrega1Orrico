export default function ItemListContainer(props) {
    const { text, name } = props;
    return (
        <div className="text-center mt-5">
            <h5>Bienvenido {name} a mi app</h5>
        </div>

    )
}