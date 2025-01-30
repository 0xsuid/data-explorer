export  default function DetailsView({
    title,
    description
}: {
    title: string,
    description: string | number
}) {
    return(
        <div>
            <div className="mb-2">
                <h4 className="text-lg font-semibold antialiased font-mono dark:text-white">{title}</h4>
            </div>
            <div className="mb-1">
                {description}
            </div>
        </div>
    )
}