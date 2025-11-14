import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Input } from '@components'
import { useAbilityCards } from '@providers'
import cn from '@lib/cn'

type ProfileFormState = {
  displayName: string
  username: string
  email: string
  pronouns: string
  timezone: string
  bio: string
  socials: Record<string, string>
}

const SOCIAL_FIELDS = [
  { key: 'discord', label: 'Discord', placeholder: 'CometCommander#2047' },
  { key: 'twitch', label: 'Twitch', placeholder: 'twitch.tv/yourchannel' },
  { key: 'twitter', label: 'X / Twitter', placeholder: '@yourhandle' },
]

const INITIAL_STATE: ProfileFormState = {
  displayName: 'Commander Nova',
  username: 'CometCommander',
  email: 'privacy@comet.gg',
  pronouns: 'They / Them',
  timezone: 'UTC-05:00',
  bio: 'Coordinating squads across the galaxy and broadcasting weekend tournaments.',
  socials: {
    discord: 'CometCommander#2047',
    twitch: 'twitch.tv/cometnova',
    twitter: '@cometnova',
  },
}

function ProfileSettingsPage() {
  const [formState, setFormState] = useState<ProfileFormState>(INITIAL_STATE)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [avatarStyle, setAvatarStyle] = useState<'default' | 'nebula' | 'aurora'>('default')
  const navigate = useNavigate()
  const { hasTierOrAbove, highestTier } = useAbilityCards()
  const canUploadCustomAvatar = hasTierOrAbove('diamond')

  const handleFieldChange = (field: keyof ProfileFormState) => (value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleSocialChange = (network: string) => (value: string) => {
    setFormState((prev) => ({
      ...prev,
      socials: { ...prev.socials, [network]: value },
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('saving')
    window.setTimeout(() => setStatus('saved'), 800)
  }

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <Card variant="glass" className="space-y-6" data-aos="fade-up" data-aos-duration="300" data-aos-delay="150">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Profile details</h2>
            <p className="text-sm text-slate-300">Update what other commanders see across rooms and leaderboards.</p>
          </div>
          <span
            className={cn(
              'rounded-full border px-3 py-1 text-xs',
              status === 'saved'
                ? 'border-emerald-400/60 bg-emerald-400/10 text-emerald-200'
                : 'border-white/15 text-slate-400',
            )}
          >
            {status === 'saved' ? 'Profile saved' : 'Unsaved changes'}
          </span>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Display name"
            value={formState.displayName}
            onChange={(event) => handleFieldChange('displayName')(event.target.value)}
            placeholder="Commander Nova"
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-delay="200"
          />
          <Input
            label="Username"
            value={formState.username}
            onChange={(event) => handleFieldChange('username')(event.target.value)}
            placeholder="@handle"
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-delay="250"
          />
          <Input
            label="Email"
            type="email"
            value={formState.email}
            onChange={(event) => handleFieldChange('email')(event.target.value)}
            placeholder="you@comet.gg"
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-delay="300"
          />
          <Input
            label="Pronouns"
            value={formState.pronouns}
            onChange={(event) => handleFieldChange('pronouns')(event.target.value)}
            placeholder="They / Them"
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-delay="350"
          />
          <Input
            label="Timezone"
            value={formState.timezone}
            onChange={(event) => handleFieldChange('timezone')(event.target.value)}
            placeholder="UTC-05:00"
            data-aos="fade-up"
            data-aos-duration="300"
            data-aos-delay="400"
          />
        </div>

        <label className="grid gap-2 text-sm text-slate-200" data-aos="fade-up" data-aos-duration="300" data-aos-delay="450">
          <span>Bio</span>
          <textarea
            value={formState.bio}
            onChange={(event) => handleFieldChange('bio')(event.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400/50 focus:shadow-[0_0_0_2px_rgba(34,211,238,0.2)]"
            placeholder="Tell other players about your role, availability, and favorite rooms."
          />
        </label>
      </Card>

      <Card variant="void" className="space-y-4" data-aos="fade-up" data-aos-duration="300" data-aos-delay="200">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Avatar & emblem</h2>
            <p className="text-sm text-slate-300">
              Equip marketplace avatars or unlock full uploads once you own a Diamond card or higher. Current tier:{' '}
              <span className="font-semibold text-cyan-200 capitalize">{highestTier}</span>.
            </p>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-[220px,1fr]">
          <div className="flex flex-col items-center gap-3">
            <div
              className={cn(
                'relative size-36 overflow-hidden rounded-3xl border border-white/10 p-1',
                avatarStyle === 'nebula' &&
                  'bg-[radial-gradient(circle_at_top,rgba(14,116,144,0.45),transparent_55%)]',
                avatarStyle === 'aurora' &&
                  'bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.4),transparent_55%)]',
                avatarStyle === 'default' && 'bg-slate-900/70',
              )}
            >
              <div className="absolute inset-0 rounded-[20px] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900/60 to-slate-950" />
              <div className="relative flex size-full items-center justify-center text-3xl font-semibold text-cyan-200">
                CN
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={avatarStyle === 'default' ? 'primary' : 'outline'}
                size="xs"
                onClick={() => setAvatarStyle('default')}
              >
                Default
              </Button>
              <Button
                type="button"
                variant={avatarStyle === 'nebula' ? 'primary' : 'outline'}
                size="xs"
                onClick={() => setAvatarStyle('nebula')}
              >
                Nebula
              </Button>
              <Button
                type="button"
                variant={avatarStyle === 'aurora' ? 'primary' : 'outline'}
                size="xs"
                onClick={() => setAvatarStyle('aurora')}
              >
                Aurora
              </Button>
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <p>
              <span className="font-semibold text-slate-100">Marketplace avatars</span> can be purchased with game coins in the
              shop. Custom uploads unlock once you buy a Diamond, Enterprise, or Mythic ability card.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => navigate('/progress/shop')}
              >
                Browse avatar marketplace
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                disabled={!canUploadCustomAvatar}
                title={
                  canUploadCustomAvatar
                    ? 'Upload a custom avatar file'
                    : 'Unlock custom uploads by purchasing a Diamond card or higher.'
                }
              >
                {canUploadCustomAvatar ? 'Upload custom avatar' : 'Locked · requires Diamond card'}
              </Button>
            </div>
            {!canUploadCustomAvatar ? (
              <p className="text-xs text-amber-300">
                Tip: Upgrade to Diamond or higher to lift avatar restrictions and enable direct uploads.
              </p>
            ) : (
              <p className="text-xs text-emerald-300">
                Custom uploads enabled. Use PNG or GIF up to 4MB to animate your profile.
              </p>
            )}
          </div>
        </div>
      </Card>

      <Card variant="void" className="space-y-4" data-aos="fade-up" data-aos-duration="300" data-aos-delay="250">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Social links</h2>
            <p className="text-sm text-slate-300">Share handles so squads and viewers can connect with you.</p>
          </div>
        </header>
        <div className="grid gap-4 sm:grid-cols-3">
          {SOCIAL_FIELDS.map((field, index) => (
            <Input
              key={field.key}
              label={field.label}
              value={formState.socials[field.key]}
              onChange={(event) => handleSocialChange(field.key)(event.target.value)}
              placeholder={field.placeholder}
              data-aos="fade-up"
              data-aos-duration="300"
              data-aos-delay={String(300 + index * 50)}
            />
          ))}
        </div>
      </Card>

      <div className="flex flex-wrap justify-end gap-3" data-aos="fade-up" data-aos-duration="300" data-aos-delay="300">
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setFormState(INITIAL_STATE)
            setStatus('idle')
          }}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" rightIcon="arrow-right" disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving...' : 'Save profile'}
        </Button>
      </div>
    </form>
  )
}

export default ProfileSettingsPage


