import { getSettingsAction } from "@/app/actions/settings/get-settings";

export async function Socials() {
  const settings = await getSettingsAction();

  return (
    <ul className="flex items-center gap-4 justify-center">
      {settings[0].socialMedia?.map((social) => (
        <li key={social.name}>
          <a href={social.url} target="_blank">
            <div
              className="icon-social"
              dangerouslySetInnerHTML={{ __html: social.icon as string }} 
            />
          </a>
        </li>
      ))}
    </ul>
  )
}