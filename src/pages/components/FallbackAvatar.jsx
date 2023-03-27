export default function FallbackAvatar({ id, square, size=100 }) {
    const squareParam = square ? "square" : ""
    const colors = "5F545C,EB7072,F5BA90,F5E2B8,A2CAA5"

    return <img src={`https://source.boringavatars.com/beam/${size}/${id}?${squareParam}&colors=${colors}`} />
}