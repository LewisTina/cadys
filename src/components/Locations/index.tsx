export const LocationsTown = ["Grand Lyon", "Saint-Etienne", "Vienne", "Vénissieux", "Givors", "Villeurbane", "Bourg-en-bresse", "Saint-Priest", "Saint-Genis", "Villefranche-sur-soâne" ]

export default function Locations(props: any){

    return(
        <section className="w-full p-10 my-20 flex justify-center bg-light-grey dark:bg-black">
            <div 
                className="
                    w-full
                    px-16
                    max-w-[1535px]
                ">

                    <div className="flex items-end justify-center flex-wrap">
                            {
                                LocationsTown?.map((location: string, idx: number) => {
                                    return(
                                        <span className="text-3xl font-bold block mx-2 my-4" key={idx}>
                                            {location} {idx < LocationsTown.length - 1 && '  -'}
                                        </span>
                                    )
                                })
                            }
                    </div>

            </div>

        </section>

    )
}